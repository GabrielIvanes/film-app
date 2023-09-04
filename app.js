const apiKey = "apiKey";

const recherche = document.querySelector(".search-box button");
const mainBox = document.querySelector(".main-box");
const error404 = document.querySelector(".error-404");
const noMovie = document.querySelector(".no-movie");
const synopsis = document.querySelector(".synopsis");

document.querySelector(".search-box input").addEventListener("input", () => {});

// When the search button is cliked
recherche.addEventListener("click", () => {
  // We recover the value enter in the input
  const filmRecherche = document.querySelector(".search-box input").value;

  // If nothing is write, display noMovie
  if (filmRecherche.length <= 0) {
    noMovie.style.display = "flex";
    error404.style.display = "none";
    mainBox.style.display = "none";
    synopsis.style.display = "none";
  }

  // Else, execute the query
  else {
    fetch(`http://www.omdbapi.com/?t=${filmRecherche}&apikey=${apiKey}`)
      .then((reponse) => reponse.json())
      .then((film) => {
        // If the movie is found into the database, display mainBox and synopsis
        if (film.Response === "True") {
          noMovie.style.display = "none";
          error404.style.display = "none";
          mainBox.style.display = "flex";
          synopsis.style.display = "flex";
          synopsis.style.flexDirection = "column";
          document.querySelector(".main-wrapper").style.width = "700px";

          const poster = document.querySelector(".poster img");
          const titre = document.querySelector(".details h2");
          const annee = document.querySelector(".annee .chiffre");
          const duree = document.querySelector(".duree .chiffre");
          const note = document.querySelector(".note .chiffre");
          const theme = document.querySelector(".theme");
          const realisateur = document.querySelector(".realisateur");
          const acteurs = document.querySelector(".acteurs");
          const texteSynopsis = document.querySelector(".synopsis .text");
          const type = document.querySelector(".details h3");

          // Recover of the different informations about the movie
          poster.src = `${film.Poster}`;
          titre.innerHTML = `${film.Title}`;
          annee.innerHTML = `${film.Year}`;
          note.innerHTML = `${film.imdbRating}`;
          realisateur.innerHTML = "<span>De</span> " + `${film.Director}`;
          acteurs.innerHTML = "<span>Avec</span> " + `${film.Actors}`;
          texteSynopsis.innerHTML = `${film.Plot}`;
          type.innerHTML = `${film.Type}`;

          let runtime = film.Runtime.replace(" min", "");
          let nbHeure = 0;
          if (runtime != "N/A") {
            // Allow us to have the time in hours:minutes rather than minutes
            while (runtime % 60 != runtime) {
              nbHeure++;
              runtime -= 60;
            }
            duree.innerHTML = nbHeure + "h" + runtime;
          } else {
            duree.innerHTML = runtime;
          }

          theme.innerHTML = "";
          let genres = film.Genre.split(", ");
          for (let i = 0; i < genres.length; i++) {
            const genre = document.createElement("div");
            genre.innerText = genres[i];
            theme.appendChild(genre);
          }
        }

        // If the movie is not found or doesn't exist, display error404
        else {
          noMovie.style.display = "none";
          error404.style.display = "flex";
          mainBox.style.display = "none";
          synopsis.style.display = "none";
        }
      });
  }
});
