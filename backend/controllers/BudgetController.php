<?php

require_once "Controller.php";
require_once __DIR__ . "/../models/Budget.php";

class BudgetController extends Controller {
    
    private $model;

    public function __construct() {
        $this->model = new Budget();
    }

    public function readBudget(){
        $budgets = $this->model->read();
        $this->json_response($budgets);
    }
}