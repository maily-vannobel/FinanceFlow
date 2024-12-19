<?php

require_once "Controller.php";
require_once __DIR__ . "/../models/Budget.php";

class BudgetController extends Controller {
    
    private $model;

    public function __construct() {
        $this->model = new Budget();
    }

    //* 1. Méthode pour la lecture des données
    public function readAllBudget(){
        $budgets = $this->model->read_all();
        if($budgets) {
            echo json_encode(["success" => true, "budgets" => $budgets]);
        }else {
            echo json_encode(["error" => "Aucun budgets trouvé"]);
        }
    }
    public function readBudgetById($user_id){
        $budgets = $this->model->read_by_id($user_id);
        if($budgets) {
            echo json_encode(["success" => true, "budgets" => $budgets]);
        }else {
            echo json_encode(["error" => "Aucun budget trouvé"]);
        }
    }

    //* 2. Méthode pour la création des données
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
        if($new_budgets) {
            echo json_encode(["success" => true, "new_budgets" => $new_budgets]);
        }else {
            echo json_encode(["error" => "Erreur lors de la création du budget"]);
        }
    }

    //* 3. Méthode pour la mise à jour des données
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
        $updated_budget = $this->model->update($amount_limit, $period, $start_date, $end_date, $year, $month);

        // Retourner une réponse avec le budget mis à jour
        if($updated_budget) {
            echo json_encode(["success" => true, "updated_budget" => $updated_budget]);
        }else {
            echo json_encode(["error" => "Erreur de la mise à jour du budget"]);
        }
    }

    //* 4. Méthode pour la suppression des données
    public function deleteBudget() {

        // Vérifier si le paramètre 'budget_id' existe dans la requête GET
        if (!isset($_GET['budget_id'])) {
            $this->json_response(['error' => 'Paramètre budget_id manquant'], 400);
            return;
        }
        // Récupérer l'ID du budget à supprimer depuis la requête GET
        $budget_id = $_GET['budget_id'];

        // Appeler la méthode delete du modèle pour supprimer le budget
        $deleted_budget = $this->model->delete($budget_id);

        // Retourner une réponse en fonction du résultat de la suppression
        if($deleted_budget) {
            echo json_encode(["success" => true, "deleted_budget" => $deleted_budget]);
        }else {
            echo json_encode(["error" => "Erreur lors de la suppression du budget"]);
        }
    }
}