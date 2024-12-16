<?php

require_once "Controller.php";
require_once __DIR__ . "/../models/Category.php";

class CategoryController extends Controller {
    private $model;

    public function __construct() {
        $this->model = new Category();
    }

    public function index() {
        $categories = $this->model->all();
        $this->json_response($categories);
    }

    public function show($id) {
        $category = $this->model->find($id);
        if ($category) {
            $this->json_response($category);
        } else {
            $this->json_response(['error' => 'Category not found'], 404);
        }
    }

    public function store($data) {
        if (!$data || empty($data['name']) || empty($data['icon_class'])) {
            $this->json_response(['error' => 'Invalid input data'], 400);
            return;
        }
    
        $category_id = $this->model->create($data);
        $this->json_response(['message' => 'Category created', 'id' => $category_id], 201);
    }

    public function update($id, $data) {
        $rows_affected = $this->model->update($id, $data);
        if ($rows_affected > 0) {
            $this->json_response(['message' => 'Category updated']);
        } else {
            $this->json_response(['error' => 'Category not found or no changes made'], 404);
        }
    }

    public function destroy($id) {
        $rows_affected = $this->model->delete($id);
        if ($rows_affected > 0) {
            $this->json_response(['message' => 'Category deleted']);
        } else {
            $this->json_response(['error' => 'Category not found'], 404);
        }
    }
}
