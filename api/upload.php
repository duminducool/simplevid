<?php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!isset($_FILES['video'])) {
        die(json_encode(['error' => 'No video file uploaded']));
    }

    $file = $_FILES['video'];
    $fileName = time() . '-' . basename($file['name']);
    $uploadDir = 'uploads/';
    $uploadPath = $uploadDir . $fileName;

    if (!file_exists($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    if (move_uploaded_file($file['tmp_name'], $uploadPath)) {
        $stmt = $pdo->prepare('INSERT INTO videos (filename, title, url) VALUES (?, ?, ?)');
        $title = pathinfo($file['name'], PATHINFO_FILENAME);
        $url = '/uploads/' . $fileName;
        
        try {
            $stmt->execute([$fileName, $title, $url]);
            echo json_encode([
                'message' => 'Video uploaded successfully',
                'file' => [
                    'filename' => $fileName,
                    'url' => $url
                ]
            ]);
        } catch(PDOException $e) {
            echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
        }
    } else {
        echo json_encode(['error' => 'Failed to upload file']);
    }
}