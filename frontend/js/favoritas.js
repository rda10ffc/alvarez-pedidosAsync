window.onload = async () => {
  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  app.appendChild(container);

  try {
    const response = await fetch('http://localhost:3031/api/movies');
    const result = await response.json();

    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (favorites.length === 0) {
      const message = document.createElement("p");
      message.textContent = "No tenes películas favoritas";
      container.appendChild(message);
    } else {
      let data = result.data;

      let favoriteMovies = data.filter(movie => favorites.includes(movie.id));

      favoriteMovies.forEach((movie) => {
        const card = document.createElement("div");
        card.setAttribute("class", "card");

        const star = document.createElement("span");
        star.setAttribute("class", "fas fa-star");
        star.setAttribute("data-id", movie.id);
        star.style.marginLeft = "10px";

        star.addEventListener('click', () => {
          favorites = favorites.filter(id => id !== movie.id);
          localStorage.setItem('favorites', JSON.stringify(favorites));

          swal("¡Listo!", "Película borrada de favoritos", "success");

          card.remove();
        });

        const h1 = document.createElement("h1");
        h1.textContent = movie.title;
        h1.appendChild(star);

        const p = document.createElement("p");
        p.textContent = `Rating: ${movie.rating}`;

        const duracion = document.createElement("p");
        duracion.textContent = `Duración: ${movie.length}`;

        container.appendChild(card);
        card.appendChild(h1);
        card.appendChild(p);
        if (movie.genre !== null) {
          const genero = document.createElement("p");
          genero.textContent = `Genero: ${movie.genre.name}`;
          card.appendChild(genero);
        }
        card.appendChild(duracion);
      });
    }
  } catch (error) {
    console.log(error)
  }
};
