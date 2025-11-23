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

    const videoId = movie.link.split("/").pop();
    const videoUrl = `/v/${videoId}`;

    div.innerHTML = `
      <a href="${videoUrl}" target="_blank">
        <img src="${movie.cover}" alt="${movie.title}" />
        <p>${movie.title}</p>
      </a>
    `;

    div.addEventListener("click", (e) => {
      const isLink = e.target.closest("a");
      if (!isLink && !e.ctrlKey && !e.metaKey && e.button === 0) {
        e.preventDefault();
        window.location.href = videoUrl;
      }
    });

    movieList.appendChild(div);
  });
}

function renderPagination() {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  const totalPages = Math.ceil(filteredMovies.length / itemsPerPage);
  const maxButtons = 5;
  let startPage = Math.max(1, currentPage - 2);
  let endPage = startPage + maxButtons - 1;
  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxButtons + 1);
  }

  if (currentPage > 1) {
    const prevBtn = document.createElement("button");
    prevBtn.textContent = "Previous";
    prevBtn.addEventListener("click", () => {
      currentPage--;
      renderPage();
      renderPagination();
    });
    pagination.appendChild(prevBtn);
  }

  for (let i = startPage; i <= endPage; i++) {
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

  if (currentPage < totalPages) {
    const nextBtn = document.createElement("button");
    nextBtn.textContent = "Next";
    nextBtn.addEventListener("click", () => {
      currentPage++;
      renderPage();
      renderPagination();
    });
    pagination.appendChild(nextBtn);

    const lastBtn = document.createElement("button");
    lastBtn.textContent = "Last";
    lastBtn.addEventListener("click", () => {
      currentPage = totalPages;
      renderPage();
      renderPagination();
    });
    pagination.appendChild(lastBtn);
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

function filterCategory(keyword) {
  filteredMovies = allMovies.filter(movie =>
    movie.title.toLowerCase().includes(keyword.toLowerCase())
  );
  currentPage = 1;
  renderPage();
  renderPagination();
}

function resetFilter() {
  filteredMovies = allMovies;
  currentPage = 1;
  renderPage();
  renderPagination();
}
