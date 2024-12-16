<?php

require_once "Controller.php";
require_once "models/User.php";

class LoginController extends Controller {
    // Cette méthode gère la logique de connexion des utilisateurs.
    public function login() {
        session_start();
        // Récupère et décode les données JSON envoyées par le client.
        $data = json_decode(file_get_contents('php://input'), true);
        // Vérifie si les champs sont remplis
        if(!$data['email'] || !$data['password']){
            echo json_encode(["error" => "Email et mot de passe sont requis"]);
            return;
        }
        // Crée une instance du modèle User pour interagir avec la table "users".
        $user = new User('users');
        $registeredUser = $user->find_by_email($data['email']);
        //Les mots de passe sont comparés( un saisi par l'utilisateur et celui chiffré de la base de données .
        if(!$registeredUser || !password_verify($data['password'], $registeredUser['password'])) {
            echo json_encode(["error" => "Email ou mot de passe incorrect"]);
            return;
        }
        //Enregistrement de l'idéntifiant  de l'utilisateur dans la session
        $_SESSION["user_id"] = $registeredUser["user_id"];
        //La function setcookie définit un cookie de session dans la navigateur d'utilisateur
        setcookie("PHPSESSID", session_id(), [
            "httponly" => true,//Le cookie n'est pas accessible via JavaScript
            "samesite" => "Lax",//le cookie est envoyé uniquement dans des cas sûrs
            "secure" => false// pour HTTP et non HTTPS
        ]);
        echo json_encode(["success" => "Connexion réussie"]);
    }
}