const GITHUB_API_URL = "https://api.github.com/repos/Ro-on/ro-on.github.io/contents/";

async function loadCategory(category) {
    try {
        const response = await fetch(GITHUB_API_URL + category);
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        const data = await response.json();
        
        const gallery = document.getElementById("gallery");
        gallery.innerHTML = ''; // Очистить текущий контент

        data.forEach(item => {
            const filePath = item.download_url;

            // Проверка на изображения
            if (item.type === 'file' && !item.name.endsWith('.mp4')) {
                const box = document.createElement("div");
                box.className = "gallery-box";
                box.onclick = () => openModal({ src: filePath });

                const img = document.createElement("img");
                img.src = filePath;
                img.alt = "Изображение";
                img.className = "gallery-image";

                box.appendChild(img);
                gallery.appendChild(box);
            }

            // Проверка на видео
            if (item.name.endsWith('.mp4')) {
                const videoBox = document.createElement("div");
                videoBox.className = "gallery-box";
                videoBox.onclick = () => openVideoModal(filePath); // Открываем модальное окно для видео

                const videoElement = document.createElement("video");
                videoElement.src = filePath;
                videoElement.alt = "Видео";
                videoElement.className = "gallery-video"; // класс для стилизации видео
                videoElement.controls = true; // Добавляем элементы управления видео

                videoBox.appendChild(videoElement);
                gallery.appendChild(videoBox);
            }
        });
    } catch (error) {
        console.error('Ошибка загрузки данных:', error);
    }
}

function openModal(img) {
    const modal = document.getElementById("modal");
    const modalImg = document.getElementById("modalImage");
    modal.style.display = "flex";
    modalImg.src = img.src;
}

function closeModal(event) {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
	if (event.target === document.getElementById('modal') || event.target === document.querySelector('.close')) {
        document.getElementById('modal').style.display = 'none';
    }
}

function openVideoModal(videoPath) {
    const videoModal = document.getElementById("videoModal");
    const modalVideo = document.getElementById("modalVideo");
    const modalSource = document.getElementById("modalVideoSource");

    modalSource.src = videoPath; 
    modalVideo.load(); // Обновить источник видео
    videoModal.style.display = "flex"; // Показать модальное окно
}

function closeVideoModal(event) {
    const videoModal = document.getElementById("videoModal");
    videoModal.style.display = "none";
	if (event.target === document.getElementById('videoModal') || event.target === document.querySelector('.close')) {
        document.getElementById('videoModal').style.display = 'none';
    }
}
