<?php
// backend/kyc_status.php — Check KYC approval status for a seller
require_once 'db.php';
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$email = isset($_GET['email']) ? trim($_GET['email']) : '';
$phone = isset($_GET['phone']) ? trim($_GET['phone']) : '';

if (!$email && !$phone) {
    echo json_encode(['kyc_completed' => false, 'approved' => false, 'error' => 'Provide email or phone']);
    exit;
}

try {
    if ($email) {
        $stmt = $pdo->prepare("SELECT id, fullname, business_name, business_latlng, approved FROM kyc_submissions WHERE email = ? ORDER BY id DESC LIMIT 1");
        $stmt->execute([$email]);
    } else {
        $stmt = $pdo->prepare("SELECT id, fullname, business_name, business_latlng, approved FROM kyc_submissions WHERE phone = ? ORDER BY id DESC LIMIT 1");
        $stmt->execute([$phone]);
    }

    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($row) {
        echo json_encode([
            'kyc_completed' => true,
            'approved'      => (int)$row['approved'] === 1,
            'kyc_id'        => (int)$row['id'],
            'fullname'      => $row['fullname'],
            'business_name' => $row['business_name'] ?: '',
            'has_location'  => !empty($row['business_latlng']),
        ]);
    } else {
        echo json_encode(['kyc_completed' => false, 'approved' => false]);
    }
} catch (Exception $e) {
    echo json_encode(['kyc_completed' => false, 'approved' => false, 'error' => 'Database error']);
}
