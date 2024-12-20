<?php

require_once "Controller.php";
require_once __DIR__ . "/../models/Dues.php";

class DuesController extends Controller {
    
    private $model;

    public function __construct() {
        $this->model = new Dues();
    }

    //* 1. Méthode pour la lecture des dettes
    public function readAllDues(){
        $dues = $this->model->read_all();
        if($dues) {
            echo json_encode(["success" => true, "dues" => $dues]);
        } else {
            echo json_encode(["error" => "Aucune dette trouvée"]);
        }
    }

    public function readDuesByUserId($user_id){
        $dues = $this->model->read_by_user_id($user_id);
        if($dues) {
            echo json_encode(["success" => true, "dues" => $dues]);
        } else {
            echo json_encode(["error" => "Aucune dette trouvée pour cet utilisateur"]);
        }
    }

    //* 2. Méthode pour la création des dettes
    public function addDue() {
        $rawData = file_get_contents('php://input');
        $data = json_decode($rawData, true);

        if (!$data) {
            echo json_encode(["error" => "Données invalides ou manquantes"]);
            http_response_code(400); // Mauvaise requête
            return;
        }

        // Extraire les valeurs des données JSON
        $description = $data['description'] ?? null;
        $initial_amount = $data['initial_amount'] ?? null;
        $start_date = $data['start_date'] ?? null;
        $due_date = $data['due_date'] ?? null;
        $user_id = $data['user_id'] ?? null;
        $transaction_id = $data['transaction_id'] ?? null;

        // Validation des champs requis
        if (!$description || !$initial_amount || !$start_date || !$due_date || !$user_id) {
            echo json_encode(["error" => "Tous les champs requis ne sont pas fournis"]);
            http_response_code(400); // Mauvaise requête
            return;
        }

        try {
            $new_due = $this->model->create($description, $initial_amount, $start_date, $due_date, $user_id, $transaction_id);

            echo json_encode(["success" => true, "new_due" => $new_due]);
        } catch (Exception $e) {
            echo json_encode(["error" => $e->getMessage()]);
            http_response_code(500); // Erreur interne du serveur
        }
    }

    //* 3. Méthode pour la mise à jour des dettes
    public function updateDue() {
        $input = json_decode(file_get_contents("php://input"), true);

        if (!$input) {
            echo json_encode(['error' => 'Données JSON invalides'], 400);
            return;
        }

        // Extraire les données
        $due_id = $input['due_id'] ?? null;
        $description = $input['description'] ?? null;
        $initial_amount = $input['initial_amount'] ?? null;
        $start_date = $input['start_date'] ?? null;
        $due_date = $input['due_date'] ?? null;
        $is_paid = $input['is_paid'] ?? null;

        if (!$due_id || !$description || !$initial_amount || !$start_date || !$due_date) {
            echo json_encode(['error' => 'Données manquantes ou invalides']);
            http_response_code(400); // Mauvaise requête
            return;
        }

        $updated_due = $this->model->update($due_id, $description, $initial_amount, $start_date, $due_date, $is_paid);

        if ($updated_due) {
            echo json_encode(["success" => true, "updated_due" => true]);
        } else {
            echo json_encode(["error" => "Erreur lors de la mise à jour de la dette"]);
            http_response_code(500); // Erreur interne du serveur
        }
    }

    //* 4. Méthode pour la suppression des dettes
    public function deleteDue() {
        if (!isset($_GET['due_id'])) {
            echo json_encode(['error' => 'Paramètre due_id manquant']);
            http_response_code(400); // Mauvaise requête
            return;
        }

        $due_id = $_GET['due_id'];
        $deleted_due = $this->model->delete($due_id);

        if ($deleted_due) {
            echo json_encode(["success" => true, "deleted_due" => $deleted_due]);
        } else {
            echo json_encode(["error" => "Erreur lors de la suppression de la dette"]);
            http_response_code(500); // Erreur interne du serveur
        }
    }
}
