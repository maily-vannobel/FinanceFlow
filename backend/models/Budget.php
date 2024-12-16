<?php

require_once "Model.php";

class Budget extends Model {

    public function __construct(){
        parent::__construct('budgets');
    }

    public function read(){
        $stmt = $this->pdo->prepare("SELECT * FROM budgets");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}