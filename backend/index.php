<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Ces en-têtes HTTP configurent le support CORS (Cross-Origin Resource Sharing)
// pour permettre les requêtes provenant de http://localhost:5173
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

if($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}
// Inclut les routes définies dans le fichier "routes/web.php"
require_once "routes/web.php";

// Récupère l'URL demandée par le client et la nettoie(Supprime le '/' du l'URL et sélectionne uniquement le nom de la route par ex. 'register')
$url = trim($_SERVER['REQUEST_URI'], '/');
$url = explode('?', $url)[0];

// Récupère le contrôleur et la méthode associés à cette route
if(isset($routes[$url])) {
    $controllerName = $routes[$url]['controller'];
    $methodName = $routes[$url]['method'];

    // Charge le fichier du contrôleur et crée une instance du contrôleur
    require_once "controllers/$controllerName.php";
    $controller = new $controllerName();

// Gère les différentes méthodes HTTP
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Récupère les données JSON envoyées dans le corps de la requête
    $data = json_decode(file_get_contents("php://input"), true);
    if ($url === 'subcategories') {
        // Appelle la méthode pour créer une sous-catégorie
        $controller->$methodName($data);
    } elseif (isset($_GET['id'])) {
        // Par exemple, pour les mises à jour
        $controller->$methodName($_GET['id'], $data);
    } else {
        // Autres cas de POST
        $controller->$methodName($data);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['id'])) {
        // Pour afficher une seule entrée (par ID)
        $controller->$methodName($_GET['id']);
    } elseif (isset($_GET['category_id'])) {
        // Pour afficher les sous-catégories par category_id
        $controller->$methodName($_GET['category_id']);
    } elseif (isset($_GET['user_cat_id'])) {
        // Pour afficher les user-subcategories par user_cat_id
        $controller->$methodName($_GET['user_cat_id']);
    } else {
        // Pour afficher toutes les entrées
        $controller->$methodName();
    }
    } elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
        if (isset($_GET['id'])) {
            // Pour supprimer une entrée (par ID)
            $controller->$methodName($_GET['id']);
        } else {
            http_response_code(400);
            echo json_encode(['error' => 'ID required for DELETE request']);
        }
    } else {
        // Méthode HTTP non autorisée
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
    }

} else {
    http_response_code(404);
    echo json_encode(['error' => 'Route not found']);
}
