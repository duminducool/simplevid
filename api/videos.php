<?php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $stmt = $pdo->query('SELECT * FROM videos ORDER BY created_at DESC');
        $videos = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        $formattedVideos = array_map(function($video) {
            return [
                'id' => $video['id'],
                'filename' => $video['filename'],
                'url' => $video['url'],
                'title' => $video['title'],
                'author' => 'User',
                'views' => rand(100, 1000) . ' views'
            ];
        }, $videos);
        
        echo json_encode(['videos' => $formattedVideos]);
    } catch(PDOException $e) {
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }
}