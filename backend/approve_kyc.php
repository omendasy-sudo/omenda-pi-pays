<?php
require_once 'db.php';
header('Content-Type: application/json');

$id = isset($_POST['id']) ? intval($_POST['id']) : 0;
if ($id > 0) {
    $stmt = $pdo->prepare("UPDATE kyc_submissions SET approved = 1 WHERE id = ?");
    $stmt->execute([$id]);
    $success = $stmt->rowCount() > 0;
    echo json_encode(['success' => $success]);
} else {
    echo json_encode(['success' => false, 'error' => 'Invalid ID']);
}
