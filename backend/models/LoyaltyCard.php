<?php

require_once "Model.php";

class LoyaltyCard extends Model {
    public function __construct() {
        parent::__construct("loyalty_card");
    }
    //Cette méthode permet de créer un nouvel enregistrement dans la table "loyalty_card"
    public function create_card($data) {
        $columns = implode(",", array_keys($data));
        $values = implode(",", array_map(fn($val) => ":$val", array_keys($data)));
        $stmt = $this->pdo->prepare("INSERT INTO {$this->table} ($columns) VALUES ($values)");
        $stmt->execute($data);
   }
   //Cette méthode permet de trouver toutes les cartes de fidélité en fonction de l'ID d'un utilisateur
    public function find_card_by_user($userId) {
        $stmt = $this->pdo->prepare("SELECT * FROM {$this->table} WHERE user_id = :user_id");
        $stmt->execute(["user_id" => $userId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
   }
   //Cette méthode permet de chercher une seule carte selon son numero
   public function find_card_by_user_and_number($userId, $cardNumber) {
    $stmt = $this->pdo->prepare("SELECT * FROM {$this->table} WHERE user_id = :user_id AND card_number = :card_number ");
    $stmt->execute(["user_id" =>$userId, "card_number" => $cardNumber]);
    return $stmt->fetch(PDO::FETCH_ASSOC);
   }
   // Cette méthode permet de supprimer une carte selon le user id et le numéro de la carte
   public function delete_card_by_user_and_number($userId,$cardNumber) {
    $stmt = $this->pdo->prepare("DELETE FROM {$this->table} WHERE user_id = :user_id AND card_number = :card_number");
    $stmt->execute(["user_id" => $userId, "card_number" => $cardNumber]);
   }
}