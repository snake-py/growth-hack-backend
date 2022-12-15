<?php

namespace App\Services;

use App\Models\ProcessedEvent;
use App\Models\RawEvent;
use App\Models\Site;
use Illuminate\Database\ConnectionInterface;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use PDO;

class ProcessEventService
{
    protected RawEvent $event;
    protected string $type;
    protected ProcessedEvent $processedEvent;
    protected Site $site;
    protected ConnectionInterface $connection;
    protected array $response;
    protected string $tableName;

    protected const MYSQL_PRIMITIVE_DATA_MAP = [
        'integer' => 'bigInt',
        'string' => 'longText',
        'double' => 'double',
        'boolean' => 'tinyInt',
        'array' => 'longText',
        'object' => 'longText',
        'NULL' => 'longText',
    ];

    public static function staticProcess($event, $type = 'event')
    {
        return (new ProcessEventService($event, $type))->process();
    }

    public function __construct($event, $type = 'event')
    {
        $this->event = $event;
        if ($type === 'test') {
            $this->tableName = $this->event->event_name . '_test';
        } else {
            $this->tableName = $this->event->event_name;
        }
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
        // 2. check if event has already been processed && the table exists
        // 3.
        // if event has never been processed call firstTimeProcessingEvent
        // else call processEvent and fill in process_event_id
        $success = $this->resolveSiteId();
        if (!$success) {
            $this->writeResponse('Site not found', 404);
            return $this->getResponse();
        }
        $success = $this->pingDB();
        if (!$success) {
            $this->writeResponse('Database not found', 404);
            return $this->getResponse();
        }

        [$success, $error] = $this->setUpProcessingEvent();

        if (!$success) {
            $this->writeResponse($error['message'], $error['code']);
            return $this->getResponse();
        }

        $success = $this->processEvent();
        if (!$success) {
            $this->writeResponse('Event not found', 404);
            return $this->getResponse();
        }
        $this->createProcessedEvent();
        $this->writeResponse('Event processed successfully', 200);
        return $this->getResponse();
    }

    //// TABLE INTERACTION ////

    protected function setUpProcessingEvent(): array
    {
        // 3 cases
        // 1. event has never been processed => try to create table and the process event
        // 2. event has been processed before but the table doesn't exist because of errors => try to create the table and process event 
        // 3. event has been processed before and the table exists => directly process event
        $doesTableExist = $this->doesTableExist();
        $incomingSchema =  $this->resolveSchemaFromInputData();

        if (!$doesTableExist) {
            $this->createTable($incomingSchema);
        } else {
            $schemaInTable = $this->getColumnDetails();
            $this->schemaComparison($incomingSchema, $schemaInTable);
        }

        return [true, ['message' => 'Event processed successfully', 'code' => 200]];
    }

    protected function doesTableExist()
    {
        return Schema::connection('dynamic')->hasTable($this->tableName);
    }


    private function createTable($columns)
    {
        Schema::connection('dynamic')->create($this->tableName, function ($table) use ($columns) {
            $table->id();
            $table->timestamps();
            foreach ($columns as $column) {
                $table->{$column['column_type']}($column['column_name'])->nullable();
            }
        });
    }

    protected function schemaComparison($incomingSchema, $schemaInTable)
    {
        $columns = array_flip(collect($schemaInTable)->pluck('Field')->toArray());
        foreach ($incomingSchema as $column) {
            if (!array_key_exists($column['column_name'], $columns)) {
                $this->addMissingColumn($column['column_name'], $column['column_type']);
            }
        }
    }

    protected function getColumnString($connection, $tableName)
    {
        $stmt = $connection->query("SHOW COLUMNS FROM `{$this->site->database_name}`.`{$tableName}`;");
        $columns = $stmt->fetchAll(PDO::FETCH_COLUMN);
        $columns =  array_filter(
            $columns,
            function ($column) {
                return !in_array($column, ['id', 'created_at', 'updated_at']);
            }
        );
        return [implode(', ', $columns), ':' . implode(', :', $columns)];
    }

    protected function getColumnDetails()
    {
        return $this->connection->select("SHOW COLUMNS FROM `{$this->site->database_name}`.`{$this->tableName}`;");
    }

    protected function addMissingColumn($column_name, $column_type)
    {
        if (Schema::connection('dynamic')->hasColumn($this->tableName, $column_name)) {
            return;
        }
        Schema::connection('dynamic')->table($this->tableName, function ($table) use ($column_name, $column_type) {
            $table->{$column_type}($column_name)->nullable();
        });
    }

    private function resolveSchemaFromInputData()
    {
        $columns = [];
        $data = json_decode($this->event->data, true);
        foreach ($data as $key => $value) {
            $columns[] = [
                'column_name' => $key,
                'column_type' => self::MYSQL_PRIMITIVE_DATA_MAP[gettype($value)],
            ];
        }
        return  $columns;
    }

    //// Event Model Interactions ////

    /**
     * Process the event for the first time
     *
     */
    protected function createProcessedEvent()
    {
        // create event schema
        $processedEvent = new ProcessedEvent();
        $processedEvent->table = $this->event->event_name;
        $processedEvent->event_name = $this->event->event_name;
        $processedEvent->site_id = $this->site->id;
        $processedEvent->count = 0;
        $processedEvent->save();
        $columns = $this->resolveSchemaFromInputData();
        $processedEvent->eventSchemas()->createMany($columns);
    }

    protected function setEventToProcessed()
    {
        $this->processedEvent->refresh();
        $this->processedEvent->count = $this->processedEvent->count + 1;
        $this->processedEvent->save();

        $this->event->refresh();
        $this->event->data = '';
        $this->event->save();
    }


    /**
     * Process the event
     *
     */
    protected function processEvent()
    {
        // $connection = $this->getConnection();
        // $tableName = $this->type === 'event' ? $this->event->event_name : $this->event->event_name . '_test';
        // $connection->beginTransaction();
        // $data = json_decode($this->event->data, true);
        // $columns = $this->getSchema($connection,  $tableName);
        // [$columnsAsString, $columnsAsValues] = $this->getColumnString($connection, $tableName);
        // $stmt = $connection->prepare(
        //     "INSERT INTO `{$this->site->database_name}`.`{$tableName}` ($columnsAsString) VALUES ({$columnsAsValues});",
        // );

        // $defaultCols = $this->getDefaultColumns($this->event);

        // foreach ($defaultCols as $column) {
        //     $stmt->bindValue(":{$column['column_name']}", $column['value']);
        // }

        // foreach ($columns as $column) {
        //     $value = $data[$column['Field']] ?? null;
        //     $stmt->bindValue(":{$column['Field']}", $value, $this->getPDOType($column['Type']));
        // }
        // $res = $stmt->execute();
        // $connection->commit();
        // return true;
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
        // $origin = $this->stripSubdomain($this->event->origin);
        $origin = $this->event->origin;
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

    //// Utils ////

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


    protected function writeResponse($message, $status = 200)
    {
        $this->event->status_message = $message;
        $this->event->save();
        $this->response = ['message' => $message, 'status' => $status];
    }

    protected function getResponse()
    {
        return $this->response;
    }

    protected function getPDOType($type)
    {
        switch ($type) {
            case 'integer' || 'bigint' || 'int' || 'tinyint' || 'smallint' || 'mediumint':
                return PDO::PARAM_INT;
            case 'string' || 'varchar' || 'text' || 'longtext' || 'mediumtext' || 'tinytext' || 'char' || 'enum' || 'set':
                return PDO::PARAM_STR;
            case 'double' || 'float' || 'decimal' || 'numeric' || 'real':
                return PDO::PARAM_STR;
            case 'boolean' || 'bool':
                return PDO::PARAM_BOOL;
            case 'NULL' || 'null' || null:
                return PDO::PARAM_NULL;
            default:
                return PDO::PARAM_STR;
        }
    }

    private function getDefaultColumns($event = null)
    {
        if (!isset($event)) {
            return [
                [
                    'column_name' => 'external_id',
                    'column_type' => 'bigint',
                ],
                [
                    'column_name' => 'user_agent',
                    'column_type' => 'longtext',
                ],
            ];
        }
        return [
            [
                'column_name' => 'external_id',
                'column_type' => 'integer',
                'value' => $event->id
            ],
            [
                'column_name' => 'user_agent',
                'column_type' => 'string',
                'value' => $event->user_agent
            ],
        ];
    }
    //// DB Set Up ////

    protected function pingDB()
    {
        try {
            $this->getConnection()->select('SELECT 1');
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }


    protected function getConnection()
    {
        if (!isset($this->connection)) {
            $this->setConnection();
        }
        return $this->connection;
    }

    protected function setConnection()
    {
        config([
            'database.connections.dynamic' => [
                'driver' => 'mysql', // to do make dynamic
                'host' => $this->site->database_host,
                'port' => $this->site->database_port,
                'database' => $this->site->database_name,
                'username' => $this->site->database_user,
                'password' => $this->site->database_password,
                'charset' => 'utf8',
                'collation' => 'utf8_unicode_ci',
                'prefix' => '',
                'strict' => false,
            ]
        ]);

        $this->connection = DB::connection('dynamic');
    }
}
