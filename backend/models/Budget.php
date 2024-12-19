<?php

require_once "Model.php";

class Budget extends Model {

    public function __construct(){
        parent::__construct('budgets');
    }

    //* 1. Fonction pour lire les budgets
    public function read_all(){
        $stmt = $this->pdo->prepare("SELECT * FROM budgets");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    public function read_by_id($user_id){
        $stmt = $this->pdo->prepare("SELECT * FROM budgets WHERE user_id = :user_id");
        $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    //* 2. Méthode pour créer un budget
    public function create($amount_limit, $period, $start_date, $end_date, $year, $month, $user_id) {
        // Valider les montants (doit être un nombre positif)
        if (!is_numeric($amount_limit) || $amount_limit <= 0) {
            throw new Exception("Le montant limite doit être un nombre positif.");
        }
        // Vérifier l'année (doit être un entier à 4 chiffres)
        if (!is_int($year) || strlen($year) != 4) {
            throw new Exception("L'année doit être un entier à 4 chiffres.");
        }
        // Vérifier le mois (doit être un entier entre 1 et 12)
        if (!is_int($month) || $month < 1 || $month > 12) {
            throw new Exception("Le mois doit être un entier entre 1 et 12.");
        }
        // Vérifier l'ID utilisateur (doit être un entier positif)
        if (!is_int($user_id) || $user_id <= 0) {
            throw new Exception("L'ID utilisateur doit être un entier positif.");
        }

        // Vérifier les dates (doivent être au format 'YYYY-MM-DD')
        $start_date = DateTime::createFromFormat('Y-m-d', $start_date);
        $end_date = DateTime::createFromFormat('Y-m-d', $end_date);
        if (!$start_date || !$end_date) {
            throw new Exception("Les dates doivent être au format 'YYYY-MM-DD'.");
        }
        // Vérifier que la date de début est avant la date de fin
        if ($start_date > $end_date) {
            throw new Exception("La date de début ne peut pas être après la date de fin.");
        }
        // Vérifier la période (doit être une valeur valide parmi les options autorisées)
        $allowed_periods = ['mensuel', 'annuel'];
        if (!in_array($period, $allowed_periods)) {
            throw new Exception("La période doit être 'mensuel' ou 'annuel'.");
        }

        $stmt = $this->pdo->prepare("INSERT INTO budgets (amount_limit, period, start_date, end_date, year, month, user_id) VALUES (:amount_limit, :period, :start_date, :end_date, :year, :month, :user_id)");
        $stmt->bindParam(':amount_limit', $amount_limit);
        $stmt->bindParam(':period', $period);
        $stmt->bindParam(':start_date', $start_date->format('Y-m-d'));  // Conversion de DateTime à string
        $stmt->bindParam(':end_date', $end_date->format('Y-m-d'));
        $stmt->bindParam(':year', $year);
        $stmt->bindParam(':month', $month);
        $stmt->bindParam(':user_id', $user_id);
        $stmt->execute();

        return [
            'budget_id' => $this->pdo->lastInsertId(),
            'amount_limit' => $amount_limit,
            'period' => $period,
            'start_date' => $start_date->format('Y-m-d'),
            'end_date' => $end_date->format('Y-m-d'),
            'year' => $year,
            'month' => $month,
            'user_id' => $user_id,
        ];
    }

    //* 3. Méthode pour mettre à jour un budget
    public function update($budget_id, $amount_limit, $period, $start_date, $end_date, $year, $month) {
        try {
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            $stmt = $this->pdo->prepare("
                UPDATE budgets 
                SET amount_limit = :amount_limit, period = :period, start_date = :start_date, end_date = :end_date, year = :year, month = :month 
                WHERE budget_id = :budget_id
            ");
            $stmt->bindParam(':budget_id', $budget_id);
            $stmt->bindParam(':amount_limit', $amount_limit);
            $stmt->bindParam(':period', $period);
            $stmt->bindParam(':start_date', $start_date);
            $stmt->bindParam(':end_date', $end_date);
            $stmt->bindParam(':year', $year);
            $stmt->bindParam(':month', $month);
            $stmt->execute();

            // Vérifier si la mise à jour a eu lieu (retourne le nombre de lignes affectées)
            return $stmt->rowCount() > 0;
        } catch (PDOException $e) {
            // Gestion des erreurs
            error_log("Erreur lors de la mise à jour : " . $e->getMessage());
            return false;
        }
    }

    //* 4. Méthode pour supprimer un budget
    public function delete($budget_id) {
        $stmt = $this->pdo->prepare("DELETE FROM budgets WHERE budget_id = :budget_id");
        $stmt->bindParam(':budget_id', $budget_id);       // Lier l'ID à la requête SQL
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            return true;
        } else {
            return false;
        }
    }

}