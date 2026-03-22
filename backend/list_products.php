<?php
// backend/list_products.php
require_once 'db.php';
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

try {
    $approved_only = isset($_GET['approved']) ? $_GET['approved'] : '1';
    if ($approved_only === '1') {
        $stmt = $pdo->query("SELECT id, name, category, price, description, `condition`, image1, image2, image3, image4, image5, image6, seller_name, created_at FROM products WHERE approved = 1 ORDER BY created_at DESC");
    } else {
        $stmt = $pdo->query("SELECT id, name, category, price, description, `condition`, image1, image2, image3, image4, image5, image6, seller_name, approved, created_at FROM products ORDER BY created_at DESC");
    }
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(['success' => true, 'products' => $products]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Failed to fetch products']);
}
