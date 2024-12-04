<?php
// Ces en-têtes HTTP configurent le support CORS (Cross-Origin Resource Sharing)
// pour permettre les requêtes provenant de http://localhost:5173
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
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

    // Appelle la méthode associée pour traiter la requête
    $controller->$methodName();
    
    // Si aucune route correspondante n'est trouvée, on répond avec un code 404
} else {
    http_response_code(404);
    echo "La page n'a pas été trouvée";
}