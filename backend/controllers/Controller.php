<?php

class Controller {

    // Méthode utilitaire pour envoyer une réponse JSON avec un statut HTTP. Utile pour les réponses API standardisées.
    protected function json_response($data, $status= 200) {
        header('Content-Type: application/json');
        http_response_code($status);
        echo json_encode($data);
        exit;
    }
    // Méthode pour rediriger les utilisateurs vers une autre URL (Peut être étendue pour inclure une logique de redirection).
    public function redirect($url) {
        header('Content-Type: application/json');
        exit;
    }
}