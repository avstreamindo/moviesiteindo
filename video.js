// Ambil ID video dari URL, misalnya /v/kfwuyhfxoyim
const path = window.location.pathname;
const videoId = path.split("/").pop();

// Buat URL lengkap dari ID
const fullVideoUrl = "https://videy.ro/e/" + videoId;

// Tampilkan iframe
const player = document.getElementById("videoPlayer");
player.innerHTML = `<iframe src="${fullVideoUrl}" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
