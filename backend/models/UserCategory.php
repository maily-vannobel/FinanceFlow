<?php

require_once "Model.php";

class UserCategory extends Model {
    public function __construct() {
        parent::__construct('user_cat'); 
    }
    public function all() {
        $stmt = $this->pdo->query("SELECT * FROM {$this->table}");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
    public function create($data) {
        $columns = implode(",", array_keys($data));
        $placeholders = implode(",", array_map(fn($key) => ":$key", array_keys($data)));

        $stmt = $this->pdo->prepare("INSERT INTO {$this->table} ($columns) VALUES ($placeholders)");
        $stmt->execute($data);

        return $this->pdo->lastInsertId(); 
    }

    public function find($id) {
        $stmt = $this->pdo->prepare("SELECT * FROM {$this->table} WHERE user_cat_id = :id");
        $stmt->execute(['id' => $id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
    public function update($id, $data) {
        $sets = implode(",", array_map(fn($key) => "$key = :$key", array_keys($data)));

        $stmt = $this->pdo->prepare("UPDATE {$this->table} SET $sets WHERE user_cat_id = :id");
        $data['id'] = $id; 
        $stmt->execute($data);

        return $stmt->rowCount();
    }

    public function delete($id) {
        $stmt = $this->pdo->prepare("DELETE FROM {$this->table} WHERE user_cat_id = :id");
        $stmt->execute(['id' => $id]);
        return $stmt->rowCount(); 
    }
}
