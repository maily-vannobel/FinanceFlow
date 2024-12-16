<?php

require_once "Model.php";

class Subcategory extends Model {
    public function __construct() {
        parent::__construct('subcategory'); // Définit la table "subcategory"
    }

    // Créer une nouvelle sous-catégorie
    public function create($data) {
        $columns = implode(",", array_keys($data));
        $placeholders = implode(",", array_map(fn($key) => ":$key", array_keys($data)));

        $stmt = $this->pdo->prepare("INSERT INTO {$this->table} ($columns) VALUES ($placeholders)");
        $stmt->execute($data);

        return $this->pdo->lastInsertId(); // Retourne l'ID de la sous-catégorie créée
    }

    // Afficher toutes les sous-catégories
    public function all() {
        $stmt = $this->pdo->query("SELECT * FROM {$this->table}");
        return $stmt->fetchAll(PDO::FETCH_ASSOC); // Retourne toutes les lignes sous forme de tableau associatif
    }

    // Trouver une sous-catégorie par son ID
    public function find($id) {
        $stmt = $this->pdo->prepare("SELECT * FROM {$this->table} WHERE subcategory_id = :id");
        $stmt->execute(['id' => $id]);
        return $stmt->fetch(PDO::FETCH_ASSOC); // Retourne une seule sous-catégorie
    }

    // Trouver toutes les sous-catégories d'une catégorie par `category_id`
    public function findByCategoryId($categoryId) {
        $stmt = $this->pdo->prepare("SELECT * FROM {$this->table} WHERE category_id = :category_id");
        $stmt->execute(['category_id' => $categoryId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC); // Retourne toutes les sous-catégories associées
    }

    // Mettre à jour une sous-catégorie
    public function update($id, $data) {
        $sets = implode(",", array_map(fn($key) => "$key = :$key", array_keys($data)));

        $stmt = $this->pdo->prepare("UPDATE {$this->table} SET $sets WHERE subcategory_id = :id");
        $data['id'] = $id; // Ajoute l'ID à l'ensemble des données pour la requête
        $stmt->execute($data);

        return $stmt->rowCount(); // Retourne le nombre de lignes modifiées
    }

    // Supprimer une sous-catégorie
    public function delete($id) {
        $stmt = $this->pdo->prepare("DELETE FROM {$this->table} WHERE subcategory_id = :id");
        $stmt->execute(['id' => $id]);
        return $stmt->rowCount(); 
    }
}
