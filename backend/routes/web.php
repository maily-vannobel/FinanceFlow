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
    
    // Routes pour Category
    "categories" => [
        "controller" => "CategoryController",
        "method" => "index"
    ],
    "categories/show" => [
        "controller" => "CategoryController",
        "method" => "show"
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
        "method" => "show"
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

    ];