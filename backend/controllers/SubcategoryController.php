<?php

require_once "Controller.php";
require_once __DIR__ . "/../models/Subcategory.php";

class SubcategoryController extends Controller {
    private $model;

    public function __construct() {
        $this->model = new Subcategory();
    }

    // Afficher toutes les sous-catégories
    public function index() {
        $subcategories = $this->model->all();
        $this->json_response($subcategories);
    }

    // Afficher une sous-catégorie spécifique
    public function show($id) {
        $subcategory = $this->model->find($id);
        if ($subcategory) {
            $this->json_response($subcategory);
        } else {
            $this->json_response(['error' => 'Subcategory not found'], 404);
        }
    }
    public function findByCategory($categoryId) {
        $subcategories = $this->model->findByCategoryId($categoryId); // Appelle la méthode dans le modèle
        if ($subcategories) {
            $this->json_response($subcategories); // Retourne les sous-catégories trouvées
        } else {
            $this->json_response(['error' => 'No subcategories found for this category'], 404);
        }
    }
    
    // Créer une nouvelle sous-catégorie
    public function store($data) {
        if (!$data || empty($data['name']) || empty($data['icon_class']) || empty($data['category_id'])) {
            $this->json_response(['error' => 'Invalid input data'], 400);
            return;
        }

        $subcategory_id = $this->model->create($data);
        $this->json_response(['message' => 'Subcategory created', 'id' => $subcategory_id], 201);
    }

    // Mettre à jour une sous-catégorie
    public function update($id, $data) {
        $rows_affected = $this->model->update($id, $data);
        if ($rows_affected > 0) {
            $this->json_response(['message' => 'Subcategory updated']);
        } else {
            $this->json_response(['error' => 'Subcategory not found or no changes made'], 404);
        }
    }

    public function destroy($id) {
        $rows_affected = $this->model->delete($id);
        if ($rows_affected > 0) {
            $this->json_response(['message' => 'Subcategory deleted']);
        } else {
            $this->json_response(['error' => 'Subcategory not found'], 404);
        }
    }
}
