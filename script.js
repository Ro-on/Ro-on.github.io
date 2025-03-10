function showCategory(folder) {
    fetchMediaFiles(folder);
}

function fetchMediaFiles(folder) {
    const container = document.getElementById('content');
    container.innerHTML = '';

    fetch(`fetch_media.php?folder=${folder}`)
        .then(response => response.json())
        .then(files => {
            files.forEach(fileName => {
                if (folder === 'images') {
                    const img = document.createElement('img');
                    img.src = `images/${fileName}`;
                    img.alt = 'Изображение';
                    img.onclick = function() {
                        openModal(img.src, false);
                    };
                    container.appendChild(img);
                } else if (folder === 'videos') {
                    const videoElement = document.createElement('video'); // создаем элемент видео
                    videoElement.src = `videos/${fileName}`;
                    videoElement.alt = 'Видео';
                    videoElement.onclick = function() { // обрабатываем клик по видео
                        openModal(videoElement.src, true);
                    };
                    container.appendChild(videoElement);
                }
            });
        })
        .catch(error => console.error('Ошибка:', error));
}

function openModal(src, isVideo = false) {
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modal-image');
    const modalVideo = document.getElementById('modal-video');
    const caption = document.getElementById('caption');

    modal.style.display = "flex";

    if (isVideo) {
        modalVideo.src = src;
        modalVideo.style.display = "block"; // Показывать видео
        modalImage.style.display = "none"; // Скрыть изображение
        modalVideo.play(); // Начать воспроизведение видео
    } else {
        modalImage.src = src;
        modalImage.style.display = "block"; // Показывать изображение
        modalVideo.style.display = "none"; // Скрыть видео
    }
}

function closeModal() {
    const modal = document.getElementById('modal');
    const modalVideo = document.getElementById('modal-video');

    modal.style.display = "none";
    modalVideo.pause(); // Остановить видео
    modalVideo.src = ''; // Очистить источник видео
}

// Закрытие модального окна при клике вне его области
window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        closeModal();
    }
};