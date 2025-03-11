const GITHUB_API_URL = "https://api.github.com/repos/Ro-on/ro-on.github.io/contents/";

function openModal(img) {
    const modal = document.getElementById("modal");
    const modalImg = document.getElementById("modalImage");
    modal.style.display = "flex";
    modalImg.src = img.src;
}

function closeModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
}

function openVideoModal(video) {
    const videoModal = document.getElementById("videoModal");
    const modalVideo = document.getElementById("modalVideo");
    const modalSource = document.getElementById("modalVideoSource");
    videoModal.style.display = "flex";
    modalSource.src = video.src;
    modalVideo.load();
}

function closeVideoModal() {
    const videoModal = document.getElementById("videoModal");
    videoModal.style.display = "none";
    const modalVideo = document.getElementById("modalVideo");
    modalVideo.src = ""; // Остановить видео
}

async function loadCategory(category) {
    const response = await fetch(GITHUB_API_URL + category);
    const data = await response.json();

    const gallery = document.getElementById("gallery");
    gallery.innerHTML = ''; // Очистить текущий контент

    data.forEach(item => {
        if (item.type === 'file') {
            const filePath = item.download_url;

            const img = document.createElement("img");
            img.src = filePath;
            img.alt = "Мем";
            img.className = "gallery-image";
            img.onclick = () => openModal(img);
            gallery.appendChild(img);
        }
    });
}

async function loadVideos() {
    const response = await fetch(GITHUB_API_URL + 'videos');
    const data = await response.json();

    const gallery = document.getElementById("gallery");
    gallery.innerHTML = ''; // Очистить текущий контент

    data.forEach(item => {
        if (item.type === 'file') {
            const filePath = item.download_url;

            const video = document.createElement("video");
            video.controls = true;
            video.src = filePath;
            video.onclick = () => openVideoModal(video);
            gallery.appendChild(video);
        }
    });
}