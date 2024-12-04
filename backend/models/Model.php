<?php

// Classe Model, représentant une table dans la base de données
class Model{
    protected $pdo; // Instance de la connexion PDO
    protected $table; // Nom de la table dans la base de données
    // Constructeur pour initialiser la table et établir la connexion à la base de données
    public function __construct($table){
        $this->table = $table; // Définit le nom de la table
        // Essaye de se connecter à la base de données avec PDO
        try{
            // Crée une instance de PDO pour se connecter à MySQL
            $this->pdo = new PDO("mysql:host=localhost;dbname=financeflow;charset=utf8", "root","");
            // Définit le mode de gestion des erreurs de PDO
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        }catch (PDOException $e){
            // Si la connexion échoue, arrête le script et affiche l'erreur
            die("L'erreur lors de la connexion à la base de données:" .$e->getMessage());
        }
    }
    // Méthode exemple pour récupérer toutes les données d'une table
    public function all()
    {
        $stmt = $this->pdo->query("SELECT * FROM {$this->table}");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}