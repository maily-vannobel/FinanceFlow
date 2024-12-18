<?php
require_once "Controller.php";
require_once "models/User.php";

class LogoutController extends Controller {
    //La méthode gére la déconexion, unset nettoie les données de la session et detroy  détruit la session
    public function logout(){
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }        
        session_unset();
        session_destroy();
        setcookie("PHPSESSID", "", time() - 3600, "/", "", true, true);
        echo json_encode(["success" => true
        ]);
        exit();
    }
}