export class TmdbApi {
    constructor(apiToken) {
        this.apiBase = "https://api.themoviedb.org/3";
        this.apiToken = apiToken;  
    }
    // recupere les films
    async discoverMovies(page = 1) {
        return this.fetchData(`/discover/movie?page=${page}`);
    }
    // recupere les films basé sur des citères spécifique
    async searchMovies(query, page = 1) {
        return this.fetchData(`/search/movie?query=${encodeURIComponent(query)}&page=${page}`);
    }
    // méthode de recherche
    async getPopularMovies(page = 1) {
        return this.fetchData(`/movie/popular?page=${page}`);
    }
    // requete API
    async fetchData(endpoint) {
        const url = `${this.apiBase}${endpoint}&api_key=${this.apiToken}`; 
        console.log(url);  
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Erreur API : ${response.statusText} (Code: ${response.status})`);
        }

        return response.json();
    }
}



