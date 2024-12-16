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
    "logout" => [
        "controller" => "LogoutController",
        "method" => "logout"
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
        "method" => "show",
        "arguments" => ["id"]
    ],
    "transactions/update" => [
        "controller" => "TransactionsController",
        "method" => "update"
    ],
    "transactions/delete" => [ 
        "controller" => "TransactionsController",
        "method" => "destroy"
    ],
    
    // Routes pour Category
    "categories" => [
        "controller" => "CategoryController",
        "method" => "index"
    ],
    "categories/show" => [
        "controller" => "CategoryController",
        "method" => "show",
        "arguments" => ["id"]
    ],
    "categories/create" => [
        "controller" => "CategoryController",
        "method" => "store"
    ],
    "categories/update" => [
        "controller" => "CategoryController",
        "method" => "update"
    ],
    "categories/delete" => [
        "controller" => "CategoryController",
        "method" => "destroy"
    ],

    // Routes pour Subcategory
    "subcategories" => [
        "controller" => "SubcategoryController",
        "method" => "index" 
    ],
    "subcategories/show" => [
        "controller" => "SubcategoryController",
        "method" => "show",
        "arguments" => ["id"]
    ],
    "subcategories/by-category" => [
        "controller" => "SubcategoryController",
        "method" => "findByCategory" 
    ],
    "subcategories/create" => [
        "controller" => "SubcategoryController",
        "method" => "store" 
    ],
    "subcategories/update" => [
        "controller" => "SubcategoryController",
        "method" => "update" 
    ],
    "subcategories/delete" => [
        "controller" => "SubcategoryController",
        "method" => "destroy" 
    ],
    
    // Routes pour Accounts
    "accounts" => [
        "controller" => "AccountController",
        "method" => "index" 
    ],
    "accounts/show" => [
        "controller" => "AccountController",
        "method" => "show",
        "arguments" => ["id"]
    ],
    "accounts/create" => [
        "controller" => "AccountController",
        "method" => "store"
    ],
    "accounts/update" => [
        "controller" => "AccountController",
        "method" => "update" 
    ],
    "accounts/delete" => [
        "controller" => "AccountController",
        "method" => "destroy"
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
    "deleteCard" => [
        "controller" => "LoyaltyCardController",
        "method" => "delete_loyalty_card"
    ],
    "uploadImage" => [
        "controller" => "ImageUploadController",
        "method" => "menage_image"
    ]
];