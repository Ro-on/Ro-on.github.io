const GITHUB_API_URL = "https://api.github.com/repos/Ro-on/ro-on.github.io/contents/";

function openModal(img) {
    const modal = document.getElementById("modal");
    const modalImg = document.getElementById("modalImage");
    modal.style.display = "block";
    modalImg.src = img.src;
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

function openVideoModal(video) {
    const videoModal = document.getElementById("videoModal");
    const modalVideo = document.getElementById("modalVideo");
    videoModal.style.display = "block";
    modalVideo.src = video.src;
}

function closeVideoModal() {
    document.getElementById("videoModal").style.display = "none";
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

            if (category === 'images') {
                const img = document.createElement("img");
                img.src = filePath;
                img.alt = "Мем";
                img.className = "gallery-image";
                img.onclick = () => openModal(img);
                gallery.appendChild(img);
            } else if (category === 'videos') {
                const video = document.createElement("video");
                video.controls = true;
                video.src = filePath;
                video.onclick = () => openVideoModal(video);
                gallery.appendChild(video);
            }
        }
    });
}