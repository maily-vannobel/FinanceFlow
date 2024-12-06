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
    
    // CRUD transactions
    "transactions" => [ 
        "controller" => "TransactionsController",
        "method" => "index"
    ],
    "transactions/create" => [ 
        "controller" => "TransactionsController",
        "method" => "store"
    ],
    "transactions/show" => [ 
        "controller" => "TransactionsController",
        "method" => "show"
    ],
    "transactions/update" => [
        "controller" => "TransactionsController",
        "method" => "update"
    ],
    "transactions/delete" => [ 
        "controller" => "TransactionsController",
        "method" => "destroy"
    ],
];