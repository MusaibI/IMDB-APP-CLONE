const apiKey = '862a3572';
const searchInput = document.querySelector('.serach-movie');
const movieContainer = document.querySelector(".movies-list");
const favoriteList = document.querySelector(".favorites-list")

async function fetchMovie(query = "titanic") { //Default it will take as titanic
    const moviesList = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${query}`)
    const data = await moviesList.json();
    console.log(data)

    if (data.Response === "True") {
        movieContainer.innerHTML = "";
        data.Search.forEach((movie) => {
            displayMovie(movie);
        })
    }
}

function displayMovie(movie) {
    const card = `<div class="movie-card">
        <img src=${movie.Poster} alt="Movie Image" />
        <span>Name: ${movie.Title}</h3>
        <span>Year: ${movie.Year}</h3>
        <button class="btn">Add Favorite</button>
        </div>`;

    // Create a new DOM element from teh card HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = card;
    const movieCard = tempDiv.firstChild;

    // Get the "Add Favorite" button within this specific movie card
    const favoriteButton = movieCard.querySelector(".btn");

    // Add event listener to the button
    favoriteButton.addEventListener("click", () => {
        addToFavorites(movie);
    });

    // Add event listener to the movie poster
    const imgOfFilm = movieCard.querySelector("img");
    imgOfFilm.addEventListener("click", () => {
        displaySingleMovie(movie);
    });

    // Appending the movie card to the container
    movieContainer.appendChild(movieCard);
}

function addToFavorites(movieList) {
    // Retrieve or initialize the favorites array from local storage
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Check if the movie is already in favorites
    const existingIndex = favorites.findIndex(movie => movie.id === movieList.imdbID);

    if (existingIndex === -1) {
        // Movie not in favorites, add it
        favorites.push({ id: movieList.imdbID, Poster: movieList.Poster, Title: movieList.Title });
        // Update local storage with the updated favorites list
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert('Added to Favorites!');
        displayFavorites();
    } else {
        alert('Movie already in Favorites!');
    }
}

function displaySingleMovie(movie) {
    window.location.href = `movieDetail.html?id=${movie.imdbID}`;
}
// Event listener for user input in search bar
searchInput.addEventListener('input', (event) => {
    const query = event.target.value.trim();
    if (query.length > 0) {
        fetchMovie(query);
    } else {
        fetchMovie("titanic")
    }
});


// JavaScript to handle opening/closing the sidebar
document.addEventListener('DOMContentLoaded', function () {
    const openSidebarBtn = document.querySelector('.open-sidebar-btn');
    const closeSidebarBtn = document.querySelector('.close-sidebar-btn');
    const sidebar = document.querySelector('.sidebar');

    openSidebarBtn.addEventListener('click', function () {
        sidebar.style.right = '0';
        openSidebarBtn.style.display = "none"
    });

    closeSidebarBtn.addEventListener('click', function () {
        sidebar.style.right = '-300px';
        openSidebarBtn.style.display = "block"
    });
});

// Function to display favorite movies in the sidebar
function displayFavorites() {
    const favoritesList = document.querySelector('.favorites-list');
    favoritesList.innerHTML = ''; // Clear the list before displaying

    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    console.log(favorites)

    favorites.forEach(movie => {
        const card = document.createElement('div');
        card.classList.add('favorite-card');
        card.innerHTML = `
        <img src="${movie.Poster}" alt="Movie Image">
        <div class="detail-remove">
        <span>Title: ${movie.Title}</span>
        <button class="delete-btn">Remove</button>
        </div>
      `;

        const deleteButton = card.querySelector('.delete-btn');
        deleteButton.addEventListener('click', () => {
            removeFromFavorites(movie.id);
        });

        favoritesList.appendChild(card);
    });
}

// Function to remove a movie from favorites
function removeFromFavorites(movieId) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(movie => movie.id !== movieId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    displayFavorites();
}

//On Load fetching Favorite movies
displayFavorites();

//fetch movies
fetchMovie();