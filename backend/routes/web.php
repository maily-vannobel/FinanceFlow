<?php

// Définition des routes de l'application : chaque route est associée à un contrôleur et une méthode spécifique.
 $routes = [
    "register" => [
        "controller" => "RegisterController",
        "method" => "register"
        // 'arguments' => ['user_id'] Un exemple d'utilisation des functions avec des paramètres
    ],
    "login" => [
        "controller" => "LoginController",
        "method" => "login"
    ],
];