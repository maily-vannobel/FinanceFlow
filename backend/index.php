<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Ces en-têtes HTTP configurent le support CORS (Cross-Origin Resource Sharing)
// pour permettre les requêtes provenant de http://localhost:5173
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
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
    $arguments = $routes[$url]['arguments'] ?? [];
    // Charge le fichier du contrôleur et crée une instance du contrôleur
    require_once "controllers/$controllerName.php";
    $controller = new $controllerName();

    // Appelle la méthode avec ou sans des paramétres associée pour traiter la requête 
    $resolvedArguments = [];
    foreach ($arguments as $argumentName) {
        $resolvedArguments[] = $_GET[$argumentName] ?? null;}$controller->$methodName(...$resolvedArguments);
    
    // Si aucune route correspondante n'est trouvée, on répond avec un code 404
} else {
    http_response_code(404);
    echo json_encode(['error' => 'Route not found']);
}
