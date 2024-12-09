<?php

require_once "models/LoyaltyCard.php";

class LoyaltyCardController {
    //Cette méthode gère l'ajout des cartes de fidélité pour les utilisateurs
    public function create_card() {
        //Récupere et décode les données json envoyées par l'utilisateur
        $data = json_decode(file_get_contents("php://input"), true);
        //Verifie si tous les champs obligatoires sont remplis
        if(!isset($data["card_number"]) || empty($data["card_number"])) {
            http_response_code(400);
            echo json_encode(["error" => "Le numero de la carte est requis"]);
            return;
        }else{
            //Crée une instance du modèle et enregistre le numero de la carte dans la base de données
            $loyaltyCardModel = new LoyaltyCard();
            $loyaltyCardModel->create_card([
                "card_number" => $data["card_number"],
                "user_id" => $data["user_id"]
            ]);
            echo json_encode(["success" => "La carte a été ajouté" ]);
            
        }
    }
    //Cette méthode permet d'afficher toutes les cartes de fidélité possédées par l'utilisateur
    public function get_loyalty_cards($userId) {
        //Crée une instance du modèle et verifie s'il y a des cartes dans la base de données
        $loyaltyCardModel = new LoyaltyCard();
        $cards = $loyaltyCardModel->find_card_by_user($userId);
        if($cards) {
            echo json_encode(["success" => true, "cards" => $cards]);
        }
        http_response_code(404);
        echo json_encode(["error" => "Aucune carte de fidélité"]);
    }

 }