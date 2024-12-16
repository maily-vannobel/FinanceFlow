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

    // Routes pour UserCategory
    "user-categories" => [
        "controller" => "UserCategoryController",
        "method" => "index" 
    ],
    "user-categories/show" => [
        "controller" => "UserCategoryController",
        "method" => "show" 
    ],
    "user-categories/create" => [
        "controller" => "UserCategoryController",
        "method" => "store" 
    ],
    "user-categories/update" => [
        "controller" => "UserCategoryController",
        "method" => "update"
    ],
    "user-categories/delete" => [
        "controller" => "UserCategoryController",
        "method" => "destroy" 
    ],

    // Routes pour UserSubcategory
    "user-subcategories" => [
        "controller" => "UserSubcategoryController",
        "method" => "index" 
    ],
    "user-subcategories/show" => [
        "controller" => "UserSubcategoryController",
        "method" => "show"
    ],
    "user-subcategories/by-category" => [
    "controller" => "UserSubcategoryController",
    "method" => "findByUserCategory"
    ],
    
    "user-subcategories/create" => [
        "controller" => "UserSubcategoryController",
        "method" => "store" 
    ],
    "user-subcategories/update" => [
        "controller" => "UserSubcategoryController",
        "method" => "update" 
    ],
    "user-subcategories/delete" => [
        "controller" => "UserSubcategoryController",
        "method" => "destroy" 
    ],
    
    // Routes pour Accounts
    "accounts" => [
        "controller" => "AccountController",
        "method" => "index" 
    ],
    "accounts/show" => [
        "controller" => "AccountController",
        "method" => "show" 
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
    ],

    // Routes pour les budgets
    "read_budgets" => [
        "controller" => "BudgetController",
        "method" => "readBudget"
    ],
    "create_budget" => [
        "controller" => "BudgetController",
        "method" => "createBudget"
    ],
    "update_budget" => [
        "controller" => "BudgetController",
        "method" => "updateBudget"
    ],
    "delete_budget" => [
        "controller" => "BudgetController",
        "method" => "deleteBudget"
    ],
];