<?php

require_once "Model.php";

class User extends Model {
    // Le constructeur initialise le modèle en spécifiant la table "users"
    public function __construct() {
        parent::__construct('users');
    }
                //////////////////////CREATE//////////////////////////////////

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

             //////////////////////READ//////////////////////////////////

    // Cette méthode recherche un utilisateur dans la table "users" par son adresse email
    public function find_by_email($email) {
        $stmt = $this->pdo->prepare("SELECT * FROM {$this->table} WHERE email = :email");
        $stmt->execute(['email' => $email]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // Cette méthode recherche un utilisateur dans la table "users" par son ID
    public function find_by_user_id($userId) {
        $stmt = $this->pdo->prepare("SELECT * FROM {$this->table} WHERE user_id = :user_id");
        $stmt->execute(['user_id' => $userId]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
    // Cette méthode recherche tout les utilisateurs dans la table users
    public function find_all() {
        $stmt = $this->pdo->query("SELECT * FROM {$this->table}");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

                //////////////////////UPDATE//////////////////////////////////

    // Cette méthode met à jour les données d'un utilisateurs identifié par ID dans la table users
    public function update($id, $data) {
        $sets = [];
        foreach($data as $column =>$value){
            $sets[] = "$column = :$column";
        }
        $sets = implode(", ", $sets);
        $stmt = $this->pdo->prepare("UPDATE {$this->table} SET $sets WHERE id = :id");
        $data["id"] = $id;
        $stmt->execute($data);

    }

                //////////////////////DELETE//////////////////////////////////

    public function delete($id) {
        $stmt = $this->pdo->prepare("DELETE FROM {$this->table} WHERE id = :id");
        $stmt->execute(["id" => $id]);
    }
}