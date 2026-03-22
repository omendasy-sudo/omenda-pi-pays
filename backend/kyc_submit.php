<?php
// backend/kyc_submit.php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'error' => 'Invalid request method']);
    exit;
}

// Validate and sanitize input
$fullname = $_POST['fullname'] ?? '';
$email = $_POST['email'] ?? '';
$phone = $_POST['phone'] ?? '';
$idtype = $_POST['idtype'] ?? '';
$idnumber = $_POST['idnumber'] ?? '';
$business_name = $_POST['business_name'] ?? '';
$business_reg = $_POST['business_reg'] ?? '';
$business_type = $_POST['business_type'] ?? '';
$business_address = $_POST['business_address'] ?? '';
$business_latlng = $_POST['business_latlng'] ?? '';

// Handle file uploads
require_once 'db.php';
$idfile_path = '';
$business_doc_path = '';
if (isset($_FILES['idfile']) && $_FILES['idfile']['error'] === UPLOAD_ERR_OK) {
    $idfile_path = 'uploads/' . basename($_FILES['idfile']['name']);
    move_uploaded_file($_FILES['idfile']['tmp_name'], $idfile_path);
}
if (isset($_FILES['business_doc']) && $_FILES['business_doc']['error'] === UPLOAD_ERR_OK) {
    $business_doc_path = 'uploads/' . basename($_FILES['business_doc']['name']);
    move_uploaded_file($_FILES['business_doc']['tmp_name'], $business_doc_path);
}

// Save to database (example: CSV for demo)
// Save to MySQL database
$stmt = $pdo->prepare("INSERT INTO kyc_submissions (
    fullname, email, phone, idtype, idnumber, idfile_path,
    business_name, business_reg, business_type, business_doc_path,
    business_address, business_latlng, created_at
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
$stmt->execute([
    $fullname, $email, $phone, $idtype, $idnumber, $idfile_path,
    $business_name, $business_reg, $business_type, $business_doc_path,
    $business_address, $business_latlng, date('Y-m-d H:i:s')
]);

// Respond
echo json_encode(['success' => true, 'message' => 'KYC submitted successfully']);
