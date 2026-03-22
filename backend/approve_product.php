<?php
// backend/approve_product.php
require_once 'db.php';
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'error' => 'Invalid request method']);
    exit;
}

$id = $_POST['id'] ?? null;
if (!$id) {
    echo json_encode(['success' => false, 'error' => 'Missing product ID']);
    exit;
}

$stmt = $pdo->prepare("UPDATE products SET approved = 1, admin_note = '', approved_at = NOW() WHERE id = ?");
$stmt->execute([$id]);

if ($stmt->rowCount() > 0) {
    echo json_encode(['success' => true, 'message' => 'Product approved']);
} else {
    echo json_encode(['success' => false, 'error' => 'Product not found or already approved']);
}
