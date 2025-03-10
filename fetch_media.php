<?php
$allowedFolders = ['images', 'videos'];
$folder = $_GET['folder'] ?? '';

if (!in_array($folder, $allowedFolders)) {
    // Если параметр не допустим
    header('HTTP/1.1 400 Bad Request');
    echo json_encode(array('error' => 'Неверный параметр folder.'));
    exit;
}

$directory = $folder . '/';

if (!is_dir($directory)) {
    // Если директория не существует
    header('HTTP/1.1 404 Not Found');
    echo json_encode(array('error' => 'Директория не найдена.'));
    exit;
}

$files = scandir($directory);
$mediaFiles = array_diff($files, array('.', '..')); // Удаляем . и ..

header('Content-Type: application/json');
echo json_encode(array_values($mediaFiles));
?>