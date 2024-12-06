<?php

require_once "Controller.php";
require_once "../models/Transactions.php";

class TransactionsController extends Controller {
    private $model;

    public function __construct() {
        $this->model = new Transactions();
    }

    public function index() {
        $transactions = $this->model->all();
        $this->json_response($transactions);
    }

    public function store($data) {
        $transaction_id = $this->model->create($data);
        $this->json_response(['message' => 'Transaction created', 'id' => $transaction_id], 201);
    }

    public function show($id) {
        $transaction = $this->model->find($id);
        if ($transaction) {
            $this->json_response($transaction);
        } else {
            $this->json_response(['error' => 'Transaction not found'], 404);
        }
    }

    public function update($id, $data) {
        $rows_affected = $this->model->update($id, $data);
        if ($rows_affected > 0) {
            $this->json_response(['message' => 'Transaction updated']);
        } else {
            $this->json_response(['error' => 'Transaction not found or no changes made'], 404);
        }
    }

    public function destroy($id) {
        $rows_affected = $this->model->delete($id);
        if ($rows_affected > 0) {
            $this->json_response(['message' => 'Transaction deleted']);
        } else {
            $this->json_response(['error' => 'Transaction not found'], 404);
        }
    }
}
