<?php

require_once "Model.php";

class Category extends Model {
    public function __construct() {
        parent::__construct('category');
    }

    public function create($data) {
        $columns = implode(",", array_keys($data));
        $placeholders = implode(",", array_map(fn($key) => ":$key", array_keys($data)));
    
        $stmt = $this->pdo->prepare("INSERT INTO {$this->table} ($columns) VALUES ($placeholders)");
        $stmt->execute($data);
    
        return $this->pdo->lastInsertId(); 
    }

    public function find($id) {
        $stmt = $this->pdo->prepare("SELECT * FROM {$this->table} WHERE category_id = :id");
        $stmt->execute(['id' => $id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

   
    public function update($id, $data) {
        $sets = implode(",", array_map(fn($key) => "$key = :$key", array_keys($data)));

        $stmt = $this->pdo->prepare("UPDATE {$this->table} SET $sets WHERE category_id = :id");
        $data['id'] = $id; // Ajoute l'ID à l'ensemble des données pour la requête
        $stmt->execute($data);

        return $stmt->rowCount(); // Retourne le nombre de lignes modifiées
    }

    // Supprimer une catégorie
    public function delete($id) {
        $stmt = $this->pdo->prepare("DELETE FROM {$this->table} WHERE category_id = :id");
        $stmt->execute(['id' => $id]);
        return $stmt->rowCount(); // Retourne le nombre de lignes supprimées
    }
}
