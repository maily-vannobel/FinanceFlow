<?php

require_once "Model.php";

class User extends Model {
    // Le constructeur initialise le modèle en spécifiant la table "users"
    public function __construct() {
        parent::__construct('users');
    }
    // Cette méthode permet de créer un nouvel enregistrement dans la table "users"
    public function create($data) {
        // Prépare une liste des colonnes pour l'insertion (ex. "firstname, lastname, email, password")
        $columns = implode(",", array_keys($data));
        // Prépare les placeholders pour les valeurs (ex. ":firstname, :lastname, :email, :password")
        $values = implode(",", array_map(fn($val) => ":$val", array_keys($data)));
        // Prépare et exécute la requête SQL pour insérer les données dans la table
        $stmt = $this->pdo->prepare("INSERT INTO {$this->table} ($columns) VALUES ($values)");
        $stmt->execute($data);
    }
    // Cette méthode(exemple) recherche un utilisateur dans la table "users" par son adresse email
    public function find_by_email($email)
    {
        $stmt = $this->pdo->prepare("SELECT * FROM {$this->table} WHERE email = :email");
        $stmt->execute(['email' => $email]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}