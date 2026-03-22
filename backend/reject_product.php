<?php
// backend/reject_product.php
require_once 'db.php';
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'error' => 'Invalid request method']);
    exit;
}

$id = $_POST['id'] ?? null;
$reason = $_POST['reason'] ?? '';

if (!$id) {
    echo json_encode(['success' => false, 'error' => 'Missing product ID']);
    exit;
}

$stmt = $pdo->prepare("UPDATE products SET approved = -1, admin_note = ? WHERE id = ?");
$stmt->execute([$reason, $id]);

if ($stmt->rowCount() > 0) {
    echo json_encode(['success' => true, 'message' => 'Product rejected']);
} else {
    echo json_encode(['success' => false, 'error' => 'Product not found']);
}
