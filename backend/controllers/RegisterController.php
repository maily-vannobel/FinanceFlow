<?php

require_once "Controller.php";
require_once "models/User.php";

class RegisterController extends Controller {
    // Cette méthode gère la logique d'inscription des utilisateurs.
    public function register() {
        // Récupère et décode les données JSON envoyées par le client
        $data = json_decode(file_get_contents('php://input'), true);
        // Vérifie si tous les champs obligatoires sont remplis
        if( !$data['firstname'] || !$data['lastname'] || !$data['address'] || !$data['zipcode'] || !$data['city'] || !$data['phone'] || !$data['email'] || !$data['password'] || !$data['repeatPassword'] ) {
            echo json_encode(["error" => "Tout les champs sont requis"]);
            return;
        }
        if ($data["password"] != $data["repeatPassword"]) {
            echo json_encode(["error" => "Les mots de passes ne correspondent pas"]);
            return;
        }
        if (!filter_var($data["email"], FILTER_VALIDATE_EMAIL)) {
            echo json_encode(["error" => "L'email n'est pas valide"]);
            return;
        }
         // Crée une instance du modèle User pour interagir avec la table "users"
        $user = new User('users');
        $existingUser = $user->find_by_email($data["email"]);
        if($existingUser) {
            http_response_code(400);
            echo json_encode([ "error" => "L'email est déjà enregistré dans la base de données"]);
            return;
        }
        $hashedPassword = password_hash($data['password'], PASSWORD_BCRYPT);
        // Enregistre l'utilisateur dans la base de données
        $user->create([
            "firstname" => $data['firstname'],
            "lastname" => $data['lastname'],
            "address" => $data["address"],
            "zipcode" => $data["zipcode"],
            "city" => $data["city"],
            "phone" => $data["phone"],
            "email" => $data['email'],
            "password" => $hashedPassword

        ]);
        echo json_encode(["success" => "L'inscription a reussi"]);
    }
}