<?php

require_once "Model.php";

class UserSubcategory extends Model {
    public function __construct() {
        parent::__construct('user_subcat');
    }

    // Lire toutes les sous-catégories personnalisées
    public function all() {
        $stmt = $this->pdo->query("SELECT * FROM {$this->table}");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Lire une sous-catégorie personnalisée par ID
    public function find($id) {
        $stmt = $this->pdo->prepare("SELECT * FROM {$this->table} WHERE user_subcat_id = :id");
        $stmt->execute(['id' => $id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function findByUserCategoryId($user_cat_id) {
        $stmt = $this->pdo->prepare("SELECT * FROM {$this->table} WHERE user_cat_id = :user_cat_id");
        $stmt->execute(['user_cat_id' => $user_cat_id]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC); // Retourne les résultats en tableau associatif
    }
    

    // Créer une nouvelle sous-catégorie personnalisée
    public function create($data) {
        $columns = implode(",", array_keys($data));
        $placeholders = implode(",", array_map(fn($key) => ":$key", array_keys($data)));

        $stmt = $this->pdo->prepare("INSERT INTO {$this->table} ($columns) VALUES ($placeholders)");
        $stmt->execute($data);

        return $this->pdo->lastInsertId(); // Retourne l'ID créé
    }

    // Mettre à jour une sous-catégorie personnalisée
    public function update($id, $data) {
        $sets = implode(",", array_map(fn($key) => "$key = :$key", array_keys($data)));

        $stmt = $this->pdo->prepare("UPDATE {$this->table} SET $sets WHERE user_subcat_id = :id");
        $data['id'] = $id; // Ajoute l'ID pour la requête
        $stmt->execute($data);

        return $stmt->rowCount(); // Retourne le nombre de lignes modifiées
    }

    // Supprimer une sous-catégorie personnalisée
    public function delete($id) {
        $stmt = $this->pdo->prepare("DELETE FROM {$this->table} WHERE user_subcat_id = :id");
        $stmt->execute(['id' => $id]);
        return $stmt->rowCount(); // Retourne le nombre de lignes supprimées
    }
}
