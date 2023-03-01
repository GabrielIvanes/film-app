const apiKey = "c90b594d";

const recherche = document.querySelector(".search-box button");
const mainBox = document.querySelector(".main-box");
const error404 = document.querySelector(".error-404");
const noMovie = document.querySelector(".no-movie");
const synopsis = document.querySelector(".synopsis");

recherche.addEventListener("click", () => {
  const filmRecherche = document.querySelector(".search-box input").value;

  if (filmRecherche.length <= 0) {
    noMovie.style.display = "flex";
    error404.style.display = "none";
    mainBox.style.display = "none";
    synopsis.style.display = "none";
  } else {
    fetch(`http://www.omdbapi.com/?t=${filmRecherche}&apikey=${apiKey}`)
      .then((reponse) => reponse.json())
      .then((film) => {
        console.log(film);
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
        } else {
          noMovie.style.display = "none";
          error404.style.display = "flex";
          mainBox.style.display = "none";
          synopsis.style.display = "none";
        }
      });
  }
});
