<?php

require_once "Controller.php";
require_once "models/User.php";

class LoginController extends Controller {
    // Cette méthode gère la logique de connexion des utilisateurs.
    public function login() {
        if( session_status() == PHP_SESSION_NONE) {
            session_start([
                "cookie_lifetime" => 43200,
                //Preparer "cookie_secure" pour la production en https
                // "cookie_secure" =>true,
                "cookie_httponly" => true,
                "cookie_samesite" => "Strict",
            ]);
        }
        // Récupère et décode les données JSON envoyées par le client.
        $data = json_decode(file_get_contents('php://input'), true);
        // Vérifie si les champs sont remplis
        if(!$data['email'] || !$data['password']){
            http_response_code(400);
            echo json_encode(["error" => "Email et mot de passe sont requis"]);
            return;
        }
        // Crée une instance du modèle User pour interagir avec la table "users".
        $user = new User('users');
        $registeredUser = $user->find_by_email($data['email']);
        //Les mots de passe sont comparés( un saisi par l'utilisateur et celui chiffré de la base de données .
        if(!$registeredUser || !password_verify($data['password'], $registeredUser['password'])) {
            http_response_code(400);
            echo json_encode(["error" => "Email ou mot de passe incorrect"]);
            return;
        }
        session_regenerate_id(true);
        //Enregistrement de l'idéntifiant  de l'utilisateur dans la session
        $_SESSION["user_id"] = $registeredUser["user_id"];

        echo json_encode([
            "success" => "Connexion réussie",
            "user_id" => $_SESSION['user_id']
        ]);
    }
}