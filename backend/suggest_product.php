<?php
// backend/suggest_product.php — Admin sends suggestion/note to seller
require_once 'db.php';
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'error' => 'Invalid request method']);
    exit;
}

$id = $_POST['id'] ?? null;
$note = $_POST['note'] ?? '';

if (!$id || !$note) {
    echo json_encode(['success' => false, 'error' => 'Product ID and note are required']);
    exit;
}

// Set approved = 2 meaning "needs changes", save admin note
$stmt = $pdo->prepare("UPDATE products SET approved = 2, admin_note = ? WHERE id = ?");
$stmt->execute([$note, $id]);

if ($stmt->rowCount() > 0) {
    echo json_encode(['success' => true, 'message' => 'Suggestion sent to seller']);
} else {
    echo json_encode(['success' => false, 'error' => 'Product not found']);
}
