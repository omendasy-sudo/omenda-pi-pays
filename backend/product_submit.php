<?php
// backend/product_submit.php
require_once 'db.php';
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'error' => 'Invalid request method']);
    exit;
}

// ── Seller identification ────────────────────────────────────
$seller_email = $_POST['seller_email'] ?? '';
$seller_name  = $_POST['seller_name'] ?? '';
if (!$seller_email) {
    echo json_encode(['success' => false, 'error' => 'Seller email is required. Please complete KYC first.']);
    exit;
}

// ── Verify KYC is completed and approved ─────────────────────
$kycStmt = $pdo->prepare(
    "SELECT id, fullname, business_name, approved FROM kyc_submissions WHERE email = ? ORDER BY id DESC LIMIT 1"
);
$kycStmt->execute([$seller_email]);
$kyc = $kycStmt->fetch(PDO::FETCH_ASSOC);

if (!$kyc) {
    echo json_encode(['success' => false, 'error' => 'KYC not found. Please complete KYC verification before posting products.', 'kyc_required' => true]);
    exit;
}
if ((int)$kyc['approved'] !== 1) {
    echo json_encode(['success' => false, 'error' => 'Your KYC is pending approval. You can post products once approved.', 'kyc_pending' => true]);
    exit;
}

// ── Collect and sanitize product input ───────────────────────
$name = $_POST['Product_Name'] ?? '';
$category = $_POST['Category'] ?? '';
$price = $_POST['Price_in_Pi'] ?? '';
$description = $_POST['Description'] ?? '';
if (!$name || !$category || !$price || !$description) {
    echo json_encode(['success' => false, 'error' => 'Missing required fields']);
    exit;
}

// Handle up to 6 images
$image_paths = [];
if (!is_dir('uploads')) { mkdir('uploads', 0755, true); }
for ($i = 1; $i <= 6; $i++) {
    $key = 'Image_' . $i;
    if (isset($_FILES[$key]) && $_FILES[$key]['error'] === UPLOAD_ERR_OK) {
        // Enforce max 5MB per file
        if ($_FILES[$key]['size'] > 5 * 1024 * 1024) {
            $image_paths[] = '';
            continue;
        }
        $ext = strtolower(pathinfo($_FILES[$key]['name'], PATHINFO_EXTENSION));
        $allowed = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
        if (!in_array($ext, $allowed)) {
            $image_paths[] = '';
            continue;
        }
        $safeName = 'products_' . time() . '_' . $i . '.' . $ext;
        $path = 'uploads/' . $safeName;
        move_uploaded_file($_FILES[$key]['tmp_name'], $path);
        $image_paths[] = $path;
    } else {
        $image_paths[] = '';
    }
}
$condition = $_POST['Condition'] ?? 'New';


try {
    $stmt = $pdo->prepare("INSERT INTO products (
        name, category, price, description, `condition`,
        image1, image2, image3, image4, image5, image6,
        seller_email, seller_name, kyc_id, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([
        $name, $category, $price, $description, $condition,
        $image_paths[0], $image_paths[1], $image_paths[2],
        $image_paths[3], $image_paths[4], $image_paths[5],
        $seller_email, $seller_name ?: $kyc['fullname'], (int)$kyc['id'],
        date('Y-m-d H:i:s')
    ]);
    echo json_encode(['success' => true, 'message' => 'Product posted successfully. It will appear after admin approval.']);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => 'Database error: ' . $e->getMessage()]);
}
