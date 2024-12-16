<?php
require_once "Controller.php";
require_once "models/User.php";

class LogoutController extends Controller {
    //La méthode gére la déconexion, unset nettoie les données de la session et detroy  détruit la session
    public function logout(){
        session_start();
        session_unset();
        session_destroy();
        setcookie(session_name(), "", time() - 3600, "/");
        echo json_encode(["success" => "Déconnexion réussie"
        ]);
        exit();
    }
}