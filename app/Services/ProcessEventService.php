<?php

namespace App\Services;

use App\Models\ProcessedEvent;
use App\Models\RawEvent;
use App\Models\Site;
use Illuminate\Support\Facades\Log;
use PDO;

class ProcessEventService
{
    protected RawEvent $event;
    protected string $type;
    protected ProcessedEvent $processedEvent;
    protected Site $site;
    protected PDO $connection;

    protected const MYSQL_PRIMITIVE_DATA_MAP = [
        'integer' => 'bigint',
        'string' => 'longtext',
        'double' => 'double',
        'boolean' => 'tinyint',
        'array' => 'longtext',
        'object' => 'longtext',
        'NULL' => 'longtext',
    ];

    public static function staticProcess($event, $type = 'event')
    {
        return (new ProcessEventService($event, $type))->process();
    }

    public function __construct($event, $type = 'event')
    {
        $this->event = $event;
        $this->type = $type;
        return $this;
    }


    /**
     * Process the event
     *
     */
    public function process()
    {
        // what do I want to do with the event?
        // 1. fill in site_id
        // 2. check if event has already been processed
        // 3.
        // if event has never been processed call firstTimeProcessingEvent
        // else call processEvent and fill in process_event_id
        $success = $this->resolveSiteId();
        if (!$success) {
            return $this->writeResponse('Site not found', 404);
        }

        $hasEventBeenProcessedBefore = $this->hasEventBeenProcessedBefore();

        if (!$hasEventBeenProcessedBefore) {
            $this->firstTimeProcessingEvent();
        }
        $success = $this->processEvent();
        if (!$success) {
            return $this->writeResponse('Event not found', 404);
        }
        return $this->writeResponse('Event processed successfully');
    }

    /**
     * Process the event for the first time
     *
     */
    protected function firstTimeProcessingEvent()
    {
        // create event schema
        $processedEvent = new ProcessedEvent();
        $processedEvent->table = $this->event->event_name;
        $processedEvent->event_name = $this->event->event_name;
        $processedEvent->site_id = $this->site->id;
        $processedEvent->count = 0;
        $processedEvent->save();
        $columns = $this->resolveSchema();
        $processedEvent->eventSchemas()->createMany($columns);
        $this->createTable($this->event->event_name, $columns);
        $this->createTable($this->event->event_name . '_test', $columns);
    }

    private function createTable($tableName, $columns)
    {
        $connection = $this->getDBConnection();
        $connection->beginTransaction();
        $stmt = $connection->prepare(
            "CREATE TABLE `{$this->site->database_name}`.`{$tableName}` (id INT NOT NULL AUTO_INCREMENT, PRIMARY KEY (id));"
        );
        $stmt->execute();
        // add columns to table
        foreach ($columns as $column) {
            $this->addMissingColumn($column['column_name'], $column['column_type'], $tableName, $connection);
        }
    }

    protected function addMissingColumn($column_name, $column_type, $tableName,  $connection = null)
    {
        $connection = $connection ?? $this->getDBConnection();
        $tableName = $tableName ?? $this->event->event_name;
        $stmt = $connection->prepare(
            "ALTER TABLE `{$this->site->database_name}`.`{$tableName}` ADD COLUMN `{$column_name}` {$column_type} DEFAULT NULL;"
        );
        $stmt->execute();
    }


    private function resolveSchema()
    {

        $columns = [];
        $data = json_decode($this->event->data, true);
        foreach ($data as $key => $value) {
            $columns[] = [
                'column_name' => $key,
                'column_type' => self::MYSQL_PRIMITIVE_DATA_MAP[gettype($value)],
            ];
        }
        return $columns;
    }


    /**
     * Process the event
     *
     */
    protected function processEvent()
    {
        $connection = $this->getDBConnection();
        $tableName = $this->type === 'event' ? $this->event->event_name : $this->event->event_name . '_test';
        $connection->beginTransaction();
        $data = json_decode($this->event->data, true);
        $columns = $this->getSchema($connection,  $tableName);
        [$columnsAsString, $columnsAsValues] = $this->getColumnString($connection, $tableName);
        $stmt = $connection->prepare(
            "INSERT INTO `{$this->site->database_name}`.`{$tableName}` ($columnsAsString) VALUES ({$columnsAsValues});",
        );

        foreach ($columns as $column) {
            $value = $data[$column['Field']] ?? null;
            $stmt->bindValue(":{$column['Field']}", $value, $this->getPDOType($column['Type']));
        }

        $stmt->execute();
        $connection->commit();
    }

    protected function getSchema($connection, $tableName = null)
    {
        $this->schemaComparison($this->getColumnDetails($connection, $tableName));
        return $this->getColumnDetails($connection, $tableName);
    }


    protected function schemaComparison($columns)
    {
        $columns = array_flip(collect($columns)->pluck('Field')->toArray());
        $requiredColumns = $this->resolveSchema();
        foreach ($requiredColumns as $column) {
            if (!array_key_exists($column['column_name'], $columns)) {
                $this->addMissingColumn($column['column_name'], $column['column_type'], $this->event->event_name);
                $this->addMissingColumn($column['column_name'], $column['column_type'], $this->event->event_name . '_test');
                $processedEvent = $this->event->processedEvent;
                $processedEvent->eventSchemas()->create($column);
            }
        }
    }


    protected function getPDOType($value)
    {
        $type = gettype($value);
        switch ($type) {
            case 'integer':
                return PDO::PARAM_INT;
            case 'string':
                return PDO::PARAM_STR;
            case 'double':
                return PDO::PARAM_STR;
            case 'boolean':
                return PDO::PARAM_BOOL;
            case 'array':
                return PDO::PARAM_STR;
            case 'object':
                return PDO::PARAM_STR;
            case 'NULL':
                return PDO::PARAM_NULL;
            default:
                return PDO::PARAM_STR;
        }
    }

    protected function getColumnString($connection, $tableName)
    {
        $stmt = $connection->query("SHOW COLUMNS FROM `{$this->site->database_name}`.`{$tableName}`;");
        $columns = $stmt->fetchAll(PDO::FETCH_COLUMN);
        array_shift($columns);
        return [implode(', ', $columns), ':' . implode(', :', $columns)];
    }

    protected function getColumnDetails($connection, $tableName)
    {
        $stmt = $connection->query("SHOW COLUMNS FROM `{$this->site->database_name}`.`{$tableName}`;");
        $columns = $stmt->fetchAll(PDO::FETCH_DEFAULT);
        array_shift($columns);
        return $columns;
    }


    protected function getDBConnection()
    {
        if (isset($this->connection) && $this->connection instanceof PDO) {
            return $this->connection;
        }
        $this->connection =  new PDO(
            "mysql:host={$this->site->database_host};dbname={$this->site->database_name}",
            $this->site->database_user,
            $this->site->database_password
        );
        return $this->connection;
    }


    protected function writeResponse($message, $status = 200)
    {
        if ($this->type === 'test') {
            return response()->json(['message' => $message], $status);
        }
        // need logic to handle errors inside the job
    }

    /**
     * Check if the event has been processed before
     *
     * @return boolean
     */
    protected function hasEventBeenProcessedBefore()
    {
        $event = ProcessedEvent::where('event_name', $this->event->event_name)
            ->where('site_id', $this->event->site_id)
            ->first();
        if ($event) {
            $this->event->processed_event_id = $event->id;
            $this->event->save();
            return true;
        } else {
            return false;
        }
    }


    /**
     * Resolve the site_id for the event
     *
     */
    protected function resolveSiteId()
    {
        $origin = $this->stripSubdomain($this->event->origin);
        $site = Site::where('url', $origin)->first();
        if ($site) {
            $this->event->site_id = $site->id;
            $this->event->save();
            $this->site = $site;
            return true;
        } else {
            return false;
        }
    }

    /**
     * Strip the subdomain from the url
     *
     * @param string $url
     * @return string
     */
    protected function stripSubdomain(string $url): string
    {
        if ($this->type === 'test') {
            return $url;
        }
        // not sure if this will work in prod
        $url = parse_url($url);
        $url = $url['host'];
        $url = explode('.', $url);
        $url = array_slice($url, -2);
        $url = implode('.', $url);
        return $url;
    }
}
