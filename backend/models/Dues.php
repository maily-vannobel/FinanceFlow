<?php

require_once "Model.php";

class Dues extends Model {

    public function __construct(){
        parent::__construct('dues');
    }

    //* 1. Fonction pour lire les dettes
    public function read_all(){
        $stmt = $this->pdo->prepare("SELECT * FROM dues");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function read_by_user_id($user_id){
        $stmt = $this->pdo->prepare("SELECT * FROM dues WHERE user_id = :user_id");
        $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    //* 2. Méthode pour créer une dette
    public function create($description, $initial_amount, $start_date, $due_date, $user_id, $transaction_id = null) {
        // Valider le montant initial (doit être un nombre positif)
        if (!is_numeric($initial_amount) || $initial_amount <= 0) {
            throw new Exception("Le montant initial doit être un nombre positif.");
        }

        // Vérifier les dates (doivent être au format 'YYYY-MM-DD')
        $start_date = DateTime::createFromFormat('Y-m-d', $start_date);
        $due_date = DateTime::createFromFormat('Y-m-d', $due_date);
        if (!$start_date || !$due_date) {
            throw new Exception("Les dates doivent être au format 'YYYY-MM-DD'.");
        }

        // Vérifier que la date de début est avant la date d'échéance
        if ($start_date > $due_date) {
            throw new Exception("La date de début ne peut pas être après la date d'échéance.");
        }

        // Préparer l'insertion
        $stmt = $this->pdo->prepare("
            INSERT INTO dues (description, initial_amount, start_date, due_date, user_id, transaction_id) 
            VALUES (:description, :initial_amount, :start_date, :due_date, :user_id, :transaction_id)
        ");
        $stmt->bindParam(':description', $description);
        $stmt->bindParam(':initial_amount', $initial_amount);
        $stmt->bindParam(':start_date', $start_date->format('Y-m-d'));
        $stmt->bindParam(':due_date', $due_date->format('Y-m-d'));
        $stmt->bindParam(':user_id', $user_id);
        $stmt->bindParam(':transaction_id', $transaction_id);

        $stmt->execute();

        return [
            'due_id' => $this->pdo->lastInsertId(),
            'description' => $description,
            'initial_amount' => $initial_amount,
            'start_date' => $start_date->format('Y-m-d'),
            'due_date' => $due_date->format('Y-m-d'),
            'user_id' => $user_id,
            'transaction_id' => $transaction_id,
        ];
    }

    //* 3. Méthode pour mettre à jour une dette
    public function update($due_id, $description, $initial_amount, $start_date, $due_date, $is_paid) {
        try {
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            $stmt = $this->pdo->prepare("
                UPDATE dues 
                SET description = :description, initial_amount = :initial_amount, start_date = :start_date, 
                    due_date = :due_date, is_paid = :is_paid 
                WHERE due_id = :due_id
            ");
            $stmt->bindParam(':due_id', $due_id, PDO::PARAM_INT);
            $stmt->bindParam(':description', $description);
            $stmt->bindParam(':initial_amount', $initial_amount);
            $stmt->bindParam(':start_date', $start_date);
            $stmt->bindParam(':due_date', $due_date);
            $stmt->bindParam(':is_paid', $is_paid, PDO::PARAM_BOOL);

            $stmt->execute();

            return $stmt->rowCount() > 0;
        } catch (PDOException $e) {
            error_log("Erreur lors de la mise à jour : " . $e->getMessage());
            return false;
        }
    }

    //* 4. Méthode pour supprimer une dette
    public function delete($due_id) {
        $stmt = $this->pdo->prepare("DELETE FROM dues WHERE due_id = :due_id");
        $stmt->bindParam(':due_id', $due_id, PDO::PARAM_INT);
        $stmt->execute();

        return $stmt->rowCount() > 0;
    }
}
