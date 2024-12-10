<?php

// Définition des routes de l'application : chaque route est associée à un contrôleur et une méthode spécifique.
 $routes = [
    "register" => [
        "controller" => "RegisterController",
        "method" => "register"
    ],
    "login" => [
        "controller" => "LoginController",
        "method" => "login"
    ],
    "addCard" => [
        "controller" => "LoyaltyCardController",
        "method" => "create_card"
    ],
    "getUserCards" => [
        "controller" => "LoyaltyCardController",
        "method" => "get_loyalty_cards",
        'arguments' => ['user_id'] //méthode avec un paramétre user_id
    ],
];