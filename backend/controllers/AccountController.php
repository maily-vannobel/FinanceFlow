<?php

require_once "Controller.php";
require_once __DIR__ . "/../models/Account.php";

class AccountController extends Controller {
    private $model;

    public function __construct() {
        $this->model = new Account();
    }

    public function index() {
        $accounts = $this->model->all();
        $this->json_response($accounts);
    }

    public function show($id) {
        $account = $this->model->find($id);
        if ($account) {
            $this->json_response($account);
        } else {
            $this->json_response(['error' => 'Account not found'], 404);
        }
    }

    public function store($data) {
        if (!$data || empty($data['name']) || !isset($data['balance']) || empty($data['user_id'])) {
            $this->json_response(['error' => 'Invalid input data'], 400);
            return;
        }

        $account_id = $this->model->create($data);
        $this->json_response(['message' => 'Account created', 'id' => $account_id], 201);
    }

    public function update($id, $data) {
        $rows_affected = $this->model->update($id, $data);
        if ($rows_affected > 0) {
            $this->json_response(['message' => 'Account updated']);
        } else {
            $this->json_response(['error' => 'Account not found or no changes made'], 404);
        }
    }

    public function destroy($id) {
        $rows_affected = $this->model->delete($id);
        if ($rows_affected > 0) {
            $this->json_response(['message' => 'Account deleted']);
        } else {
            $this->json_response(['error' => 'Account not found'], 404);
        }
    }
}
