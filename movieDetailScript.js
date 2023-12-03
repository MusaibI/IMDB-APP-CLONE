const singleMovieDiv = document.querySelector(".single-movie");

function getMovieIdFromUrl() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const movieId = urlParams.get('id');
    return movieId;
}

const movieId = getMovieIdFromUrl();

async function fetchSingleMovie() {
    const movieList = await fetch(`https://www.omdbapi.com/?i=${movieId}&apikey=862a3572`)
    const data = await movieList.json();
    console.log(data)

    singleMoviePage(data);
}

function singleMoviePage(movie) {

    //Clearing div before displaying single movie
    singleMovieDiv.innerHTML = "";

    const moviePoster = `
    <img src= ${movie.Poster} alt = "Movie Poster">
    <div class = "other-details">
    <h3>Title:${movie.Title}</h3>
    <h2>Year of Release: ${movie.Year}</h2>
    <p>Actors: ${movie.Actors}</p>
    <p>Genre: ${movie.Genre}</p>
    <p>County: ${movie.Country}</p>
    </div>
    `

    singleMovieDiv.innerHTML = moviePoster;
}


fetchSingleMovie();
