window.onload = async () => {
  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  app.appendChild(container);

  try {
    const response = await fetch('http://localhost:3031/api/movies');
    const result = await response.json();

    let data = result.data;

    data.forEach((movie) => {
      const card = document.createElement("div");
      card.setAttribute("class", "card");

      const star = document.createElement("i");
      star.setAttribute("class", "fas fa-star");
      star.setAttribute("data-id", movie.id);
      star.style.marginLeft = "10px";


      star.addEventListener('click', () => {

        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  
        if(star.classList.contains('not-favorite')) {
          star.classList.remove('not-favorite');
          star.classList.add('favorite');
        } else {
          star.classList.remove('favorite'); 
          star.classList.add('not-favorite');
        }
  
        if (!favorites.includes(movie.id)) {
          favorites.push(movie.id);
        } else {
          favorites = favorites.filter(id => id !== movie.id)  
        }
  
        localStorage.setItem('favorites', JSON.stringify(favorites));
  
        swal("", "Actualización: Estado de favorito", "success");
        
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

      const link = document.createElement('a');
      link.setAttribute('href', `formulario.html?movie=${movie.id}&edit=true`);
      link.textContent = "EDITAR"
      link.classList = "botonAgregar"
      card.appendChild(link)
    });
  } catch (error) {
    console.log(error)
  }
};
