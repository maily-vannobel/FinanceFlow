<?php

require_once "Controller.php";
require_once __DIR__ . "/../models/Budget.php";

class BudgetController extends Controller {
    
    private $model;

    public function __construct() {
        $this->model = new Budget();
    }

    //* 1. Méthode pour appeler la lecture des données
    public function readBudget(){
        $budgets = $this->model->read();
        $this->json_response($budgets, 200);
    }

    //* 2. Méthode pour appeler la création des données
    public function addBudget() {
        // Récupérer les données depuis POST
        $amount_limit = $_POST['amount_limit'];
        $period = $_POST['period'];
        $start_date = $_POST['start_date'];
        $end_date = $_POST['end_date'];
        $year = $_POST['year'];
        $month = $_POST['month'];
        $user_id = $_POST['user_id'];

        // Appeler la méthode create du modèle pour ajouter le budget
        $new_budget = $this->model->create($amount_limit, $period, $start_date, $end_date, $year, $month, $user_id);

        // Retourner une réponse avec le budget créé
        $this->json_response($new_budget, 201);
    }

    //* 3. Méthode pour appeler la mise à jour des données
    public function updateBudget() {
        // Récupérer les données depuis POST
        $amount_limit = $_POST['amount_limit'];
        $period = $_POST['period'];
        $start_date = $_POST['start_date'];
        $end_date = $_POST['end_date'];
        $year = $_POST['year'];
        $month = $_POST['month'];
        $user_id = $_POST['user_id'];

        // Appeler la méthode update du modèle pour mettre à jour le budget
        $updated_budget = $this->model->update($id, $amount_limit, $period, $start_date, $end_date, $year, $month, $user_id);

        // Retourner une réponse avec le budget mis à jour
        $this->json_response($updated_budget, 200);
    }

    //* 4. Méthode pour appeler la suppression des données
    public function deleteBudget() {
        // Récupérer l'ID du budget à supprimer depuis la requête GET
        $id = $_GET['id'];

        // Appeler la méthode delete du modèle pour supprimer le budget
        $deleted_budget = $this->model->delete($id);

        // Retourner une réponse en fonction du résultat de la suppression
        if ($deleted_budget) {
            $this->json_response(['message' => 'Budget supprimé avec succès'], 200);
        } else {
            $this->json_response(['error' => 'Erreur lors de la suppression du budget'], 500);
        }
    }

}