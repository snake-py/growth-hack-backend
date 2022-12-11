<?php

namespace App\Services;

use App\Models\Site;
use PDO;


class QueryEvents
{
    protected $table;
    protected Site $site;
    protected PDO $connection;

    public function __construct(
        $site,
        $tableName
    ) {
        $this->site = $site;
        $this->table = $tableName;
        $this->connection = $this->getDBConnection();
    }

    public function getLatestEvents($limit = 10, $order = 'DESC')
    {
        $query = $this->connection->prepare("SELECT * FROM {$this->table} ORDER BY id {$order} LIMIT {$limit}");
        $query->execute();
        return $query->fetchAll(PDO::FETCH_ASSOC);
    }

    protected function getDBConnection()
    {
        if (isset($this->connection) && $this->connection instanceof PDO) {
            return $this->connection;
        }
        $this->connection =  new PDO(
            "mysql:host={$this->site->database_host};dbname={$this->site->database_name};port={$this->site->database_port}",
            $this->site->database_user,
            $this->site->database_password
        );
        return $this->connection;
    }
}
