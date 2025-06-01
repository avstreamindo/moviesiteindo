const itemsPerPage = 30;
let currentPage = 1;
let allMovies = [];
let filteredMovies = [];

fetch('data/movies.json')
  .then(res => res.json())
  .then(data => {
    allMovies = data.bioskop.reverse(); // ← membalik urutan agar terbaru di atas
    filteredMovies = allMovies;
    renderPage();
    renderPagination();
  });

function renderPage() {
  const movieList = document.getElementById("movieList");
  movieList.innerHTML = "";

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const currentMovies = filteredMovies.slice(start, end);

  currentMovies.forEach(movie => {
    const div = document.createElement("div");
    div.className = "movie";
    div.innerHTML = `
      <img src="${movie.cover}" alt="${movie.title}" />
      <p>${movie.title}</p>
    `;
    div.addEventListener("click", () => showVideo(movie.link));
    movieList.appendChild(div);
  });
}

function renderPagination() {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  const totalPages = Math.ceil(filteredMovies.length / itemsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.textContent = i;
    if (i === currentPage) {
      button.classList.add("active");
    }
    button.addEventListener("click", () => {
      currentPage = i;
      renderPage();
      renderPagination();
    });
    pagination.appendChild(button);
  }
}

function handleSearch() {
  const keyword = document.getElementById("searchInput").value.toLowerCase();
  filteredMovies = allMovies.filter(movie =>
    movie.title.toLowerCase().includes(keyword)
  );
  currentPage = 1;
  renderPage();
  renderPagination();
}

function showVideo(url) {
  const modal = document.getElementById("videoModal");
  const player = document.getElementById("videoPlayer");
  let embed = "";

  if (
    url.includes("youtube.com") ||
    url.includes("youtu.be") ||
    url.includes("videy.ro")
  ) {
    embed = `<iframe src="${url}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
  } else {
    embed = `<video controls autoplay><source src="${url}" type="video/mp4"></video>`;
  }

  player.innerHTML = embed;
  modal.style.display = "flex";
}

function closeVideo() {
  const modal = document.getElementById("videoModal");
  const player = document.getElementById("videoPlayer");
  modal.style.display = "none";
  player.innerHTML = "";
}
