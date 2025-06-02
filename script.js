const itemsPerPage = 30;
let currentPage = 1;
let allMovies = [];
let filteredMovies = [];

fetch('data/movies.json')
  .then(res => res.json())
  .then(data => {
    allMovies = data.bioskop.reverse();
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

    const videoId = movie.link.split("/").pop();
    div.addEventListener("click", () => {
      window.location.href = `/video/${videoId}`;
    });

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

  const totalPages = Math.ceil(filteredMovies.length / itemsPerPage);
  if (currentPage > totalPages) {
    currentPage = totalPages || 1; // fallback ke halaman 1 jika tidak ada hasil
  }

  renderPage();
  renderPagination();
}
