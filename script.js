import { TmdbApi } from './TmdbApi.js';

const API_TOKEN = '7e8a8b594b15bf8a463813b30452dddd';
const api = new TmdbApi(API_TOKEN);

const form = document.getElementById('search-form');
const moviesList = document.getElementById('movies-list');
const pagination = {
    prev: document.getElementById('prev-page'),
    next: document.getElementById('next-page'),
    current: document.getElementById('current-page'),
};

let currentPage = 1;
let currentQuery = "";

// fonction pour charger les 15 films populaires de m'api
async function loadPopularMovies(page = 1, showAlert = true) {
    try {
        const data = await api.getPopularMovies(page);
        displayMovies(data.results.slice(0, 15));
        updatePagination(data.page, data.total_pages);
    } catch (error) {
        console.error(error);
        if (showAlert) {
            alert("Erreur lors du chargement des films populaires.");
        }
    }
}
// fonction pour charger les film de l'api 
async function loadMovies(apiMethod, query = "", page = 1, showAlert = true) {
    try {
        const data = await apiMethod(query, page);
        displayMovies(data.results);
        updatePagination(data.page, data.total_pages);
    } catch (error) {
        console.error(error);
        if (showAlert) {
            alert("Erreur lors du chargement des films.");
        }
    }
}
// ajout de film dans une liste
function displayMovies(movies) {
    moviesList.innerHTML = movies.map(movie =>
        `<li>
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <p>${movie.title} (${movie.release_date ? movie.release_date.split('-')[0] : 'Date inconnue'})</p>
        </li>`
    ).join('');
}


// pagi
function updatePagination(page, totalPages) {
    pagination.current.textContent = page;
    pagination.prev.disabled = page === 1;
    pagination.next.disabled = page === totalPages;
}

// evenement au submit

form.addEventListener('submit', event => {
    event.preventDefault();
    currentQuery = document.getElementById('query').value.trim();
    currentPage = 1;
    loadMovies(api.searchMovies.bind(api), currentQuery, currentPage, true);
});
// evenementau clic pour changer de page des films 
pagination.prev.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        loadMovies(currentQuery ? api.searchMovies.bind(api) : api.discoverMovies.bind(api), currentQuery, currentPage);
    }
});

pagination.next.addEventListener('click', () => {
    currentPage++;
    loadMovies(currentQuery ? api.searchMovies.bind(api) : api.discoverMovies.bind(api), currentQuery, currentPage);
});

// appel des fonctions
loadPopularMovies(1);
loadMovies(api.discoverMovies.bind(api), "", 1, false);


