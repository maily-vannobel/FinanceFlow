<?php

require_once "Model.php";

class Transactions extends Model {
    public function __construct() {
        parent::__construct('transactions');
    }

    public function create($data) {
        $columns = implode(",", array_keys($data));
        $values = implode(",", array_map(fn($val) => ":$val", array_keys($data)));
        $stmt = $this->pdo->prepare("INSERT INTO {$this->table} ($columns) VALUES ($values)");
        $stmt->execute($data);
        return $this->pdo->lastInsertId();
    }

    public function all() {
        $stmt = $this->pdo->query("SELECT * FROM {$this->table}");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function find($id) {
        $stmt = $this->pdo->prepare("SELECT * FROM {$this->table} WHERE transaction_id = :id");
        $stmt->execute(['id' => $id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function update($id, $data) {
        $set = implode(", ", array_map(fn($key) => "$key = :$key", array_keys($data)));
        $stmt = $this->pdo->prepare("UPDATE {$this->table} SET $set WHERE transaction_id = :id");
        $data['id'] = $id;
        $stmt->execute($data);
        return $stmt->rowCount();
    }

    public function delete($id) {
        $stmt = $this->pdo->prepare("DELETE FROM {$this->table} WHERE transaction_id = :id");
        $stmt->execute(['id' => $id]);
        return $stmt->rowCount();
    }
}
