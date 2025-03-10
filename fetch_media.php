<?php
$folder = $_GET['folder'];
$directory = ($folder === 'images') ? 'images/' : (($folder === 'videos') ? 'videos/' : '');

if (!is_dir($directory)) {
    // Если директория не существует, возвращаем ошибку
    header('HTTP/1.1 404 Not Found');
    echo json_encode(array('error' => 'Директория не найдена.'));
    exit;
}

$files = scandir($directory);
$mediaFiles = array_diff($files, array('.', '..')); // Удаляем . и ..

header('Content-Type: application/json');
echo json_encode(array_values($mediaFiles));
?>