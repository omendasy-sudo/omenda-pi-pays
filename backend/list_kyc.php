<?php
require_once 'db.php';
header('Content-Type: application/json');

$stmt = $pdo->query("SELECT id, fullname, email, phone, business_name, business_type, business_latlng, approved, created_at FROM kyc_submissions ORDER BY id DESC");
$kyc = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($kyc);
