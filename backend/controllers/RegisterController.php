<?php

require_once "Controller.php";
require_once "models/User.php";

class RegisterController extends Controller {
    // Cette méthode gère la logique d'inscription des utilisateurs.
    public function register() {
        // Récupère et décode les données JSON envoyées par le client
        $data = json_decode(file_get_contents('php://input'), true);
        // Vérifie si tous les champs obligatoires sont remplis
        if( !$data['firstname'] || !$data['lastname'] || !$data['email'] || !$data['password']) {
            echo json_encode(["error" => "Tout les champs sont requis"]);
            return;
        }
         // Crée une instance du modèle User pour interagir avec la table "users"
        $user = new User('users');
        $hashedPassword = password_hash($data['password'], PASSWORD_BCRYPT);
        // Enregistre l'utilisateur dans la base de données
        $user->create([
            "firstname" => $data['firstname'],
            "lastname" => $data['lastname'],
            "email" => $data['email'],
            "password" => $hashedPassword

        ]);
        echo json_encode(["success" => "L'inscription a reussi"]);
    }
}