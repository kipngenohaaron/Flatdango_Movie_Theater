// DOM elements
const movieTitleElement = document.getElementById('movie-title');
const moviePosterElement = document.getElementById('movie-poster');
const movieRuntimeElement = document.getElementById('movie-runtime');
const movieShowtimeElement = document.getElementById('movie-showtime');
const movieTicketsElement = document.getElementById('movie-tickets');
const buyTicketBtn = document.getElementById('buy-ticket-btn');
const filmsListElement = document.getElementById('films');

// Fetch film data from the server for the default movie (id: 1)
fetch('/films/1')
  .then(response => response.json())
  .then(movie => {
    // Update movie details on the page
    movieTitleElement.textContent = movie.title;
    moviePosterElement.src = movie.poster;
    movieRuntimeElement.textContent = `Runtime: ${movie.runtime} minutes`;
    movieShowtimeElement.textContent = `Showtime: ${movie.showtime}`;
    movieTicketsElement.textContent = `Tickets available: ${movie.capacity - movie.tickets_sold}`;

    // Disable buy ticket button if sold out
    if (movie.tickets_sold >= movie.capacity) {
      buyTicketBtn.disabled = true;
      buyTicketBtn.textContent = "Sold Out";
    } else {
      buyTicketBtn.disabled = false;
      buyTicketBtn.textContent = "Buy Ticket";
    }
  })
  .catch(error => {
    console.error("Error fetching movie data:", error);
  });

// Fetch films data from the server to create the film list
fetch('/films')
  .then(response => response.json())
  .then(films => {
    // Create film list items
    films.forEach(film => {
      const li = document.createElement('li');
      li.textContent = film.title;
      // Add click event listener to each film list item
      li.addEventListener('click', () => {
        // Fetch and display movie details when a film is clicked
        fetch(`/films/${film.id}`)
          .then(response => response.json())
          .then(movie => {
            // Update movie details on the page
            movieTitleElement.textContent = movie.title;
            moviePosterElement.src = movie.poster;
            movieRuntimeElement.textContent = `Runtime: ${movie.runtime} minutes`;
            movieShowtimeElement.textContent = `Showtime: ${movie.showtime}`;
            movieTicketsElement.textContent = `Tickets available: ${movie.capacity - movie.tickets_sold}`;

            // Disable buy ticket button if sold out
            if (movie.tickets_sold >= movie.capacity) {
              buyTicketBtn.disabled = true;
              buyTicketBtn.textContent = "Sold Out";
            } else {
              buyTicketBtn.disabled = false;
              buyTicketBtn.textContent = "Buy Ticket";
            }
          })
          .catch(error => {
            console.error("Error fetching movie data:", error);
          });
      });
      filmsListElement.appendChild(li);
    });
  })
  .catch(error => {
    console.error("Error fetching films data:", error);
  });

// Handle buy ticket button click
buyTicketBtn.addEventListener('click', () => {
  const movieTitle = movieTitleElement.textContent;
  alert(`You have purchased a ticket for ${movieTitle}`);
});
