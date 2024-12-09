<?php

require_once "Controller.php";
require_once __DIR__ . "/../models/UserSubcategory.php";

class UserSubcategoryController extends Controller {
    private $model;

    public function __construct() {
        $this->model = new UserSubcategory();
    }

    public function index() {
        $userSubcategories = $this->model->all();
        $this->json_response($userSubcategories);
    }

    public function show($id) {
        $userSubcategory = $this->model->find($id);
        if ($userSubcategory) {
            $this->json_response($userSubcategory);
        } else {
            $this->json_response(['error' => 'User subcategory not found'], 404);
        }
    }

    public function findByUserCategory($user_cat_id) {
        if (!$user_cat_id) {
            $this->json_response(['error' => 'user_cat_id is required'], 400);
            return;
        }
    
        $userSubcategories = $this->model->findByUserCategoryId($user_cat_id);
    
        if ($userSubcategories) {
            $this->json_response($userSubcategories);
        } else {
            $this->json_response(['error' => 'No user subcategories found for the given user_cat_id'], 404);
        }
    }
    
    // Créer une nouvelle sous-catégorie personnalisée
    public function store($data) {
        if (!$data || empty($data['name']) || empty($data['icon']) || empty($data['user_cat_id'])) {
            $this->json_response(['error' => 'Invalid input data'], 400);
            return;
        }

        $subcategory_id = $this->model->create($data);
        $this->json_response(['message' => 'Subcategory created', 'id' => $subcategory_id], 201);
    }

    // Mettre à jour une sous-catégorie personnalisée
    public function update($id, $data) {
        $rows_affected = $this->model->update($id, $data);
        if ($rows_affected > 0) {
            $this->json_response(['message' => 'Subcategory updated']);
        } else {
            $this->json_response(['error' => 'Subcategory not found or no changes made'], 404);
        }
    }

    // Supprimer une sous-catégorie personnalisée
    public function destroy($id) {
        $rows_affected = $this->model->delete($id);
        if ($rows_affected > 0) {
            $this->json_response(['message' => 'Subcategory deleted']);
        } else {
            $this->json_response(['error' => 'Subcategory not found'], 404);
        }
    }
}
