// const movieTitleElement = document.getElementById('movie-title');
// const moviePosterElement = document.getElementById('movie-poster');
// const movieRuntimeElement = document.getElementById('movie-runtime');
// const movieShowtimeElement = document.getElementById('movie-showtime');
// const movieTicketsElement = document.getElementById('movie-tickets');
// const buyTicketBtn = document.getElementById('buy-ticket-btn');
// const filmsListElement = document.getElementById('films');

// // Fetch film data from the server
// fetch('/films/1')
//   .then(response => response.json())
//   .then(movie => {
//     // Update movie details on the page
//     movieTitleElement.textContent = movie.title;
//     moviePosterElement.src = movie.poster;
//     movieRuntimeElement.textContent = `Runtime: ${movie.runtime} minutes`;
//     movieShowtimeElement.textContent = `Showtime
document.addEventListener("DOMContentLoaded", function() {
    const filmsList = document.getElementById("films");
    const moviePoster = document.getElementById("movie-poster");
    const movieTitle = document.getElementById("movie-title");
    const movieRuntime = document.getElementById("movie-runtime");
    const movieShowtime = document.getElementById("movie-showtime");
    const movieTickets = document.getElementById("movie-tickets");
    const buyTicketBtn = document.getElementById("buy-ticket-btn");
  
    // Fetch films data
    fetch("/films")
      .then(response => response.json())
      .then(films => {
        // Populate films list
        films.forEach(film => {
          const li = document.createElement("li");
          li.className = "film-item";
          li.textContent = film.title;
          li.addEventListener("click", () => showMovieDetails(film));
          filmsList.appendChild(li);
        });
  
        // Show details of the first film
        showMovieDetails(films[0]);
      })
      .catch(error => console.error(error));
  
    function showMovieDetails(film) {
      moviePoster.style.backgroundImage = `url(${film.poster})`;
      movieTitle.textContent = film.title;
      movieRuntime.textContent = `Runtime: ${film.runtime} min`;
      movieShowtime.textContent = `Showtime: ${film.showtime}`;
      movieTickets.textContent = `Tickets available: ${film.capacity - film.tickets_sold}`;
  
      buyTicketBtn.disabled = film.tickets_sold >= film.capacity;
      buyTicketBtn.textContent = film.tickets_sold >= film.capacity ? "Sold Out" : "Buy Ticket";
    }
  });
  