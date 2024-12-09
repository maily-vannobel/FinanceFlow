<?php

require_once "Model.php";

class LoyaltyCard extends Model {
    public function __construct() {
        parent::__construct("loyalty_cards");
    }
    //Cette méthode permet de créer un nouvel enregistrement dans la table "loyalty_card"
    public function create_card($data) {
        $columns = implode(",", array_keys($data));
        $values = implode(",", array_map(fn($val) => ":$val", array_keys($data)));
        $stmt = $this->pdo->prepare("INSERT INTO {$this->table} ($columns) VALUES ($values)");
        $stmt->execute($data);
   }
}