let cardMovie = document.getElementById("film-content");

async function getMovies(searchValue = "jurassic_park") {
    const url = "https://www.omdbapi.com/?s=" + searchValue + "&plot=short&apikey=2a4831ba"
    const response = await fetch(url)
    const data = await response.json()
    return data.Search
}

function generateMoviesList(searchValue) {
    getMovies(searchValue).then(function(movies) {
        console.log(movies)

        movies.forEach(function(movie) {
            const card = document.createElement("div")
            card.classList.add("card")

            const img = document.createElement("img")
            img.setAttribute("src", movie.Poster)
            img.classList.add("card-img-top")
            card.appendChild(img)

            const cardBody = document.createElement("div")
            cardBody.classList.add("card-body")
            card.appendChild(cardBody)

            const cardTitle = document.createElement("h5")
            cardTitle.classList.add("card-title")
            cardTitle.innerHTML = "<h5>Titre principal :</h5> " + movie.Title
            cardBody.appendChild(cardTitle)

            const cardText = document.createElement("p")
            cardText.classList.add("card-text")
            cardText.textContent = "Année : " + movie.Year
            cardBody.appendChild(cardText)

            const cardButton = document.createElement("a")
            cardButton.classList.add("card-button")
            cardButton.setAttribute('href', "https://www.imdb.com/title/" + movie.imdbID);
            cardButton.setAttribute("target", "_blank")
            cardButton.innerHTML = '<button type="button" class="btn btn-outline-light">Voir plus</button>'
            cardBody.appendChild(cardButton)

            document.querySelector("#film-content").appendChild(card)
        })
    })
}

////////////////////////
// Execution du code au chargement de la page

// Au chargement, on génère la liste par défaut avec recherche star wars
generateMoviesList()

// Au clic sur le bouton, on envoie la recherche tapée à la même fonction
// Après avoir vidé le HTML

document.querySelector("button").addEventListener("click", function() {
    const searchValue = document.querySelector(".form-control").value

    document.querySelector("#film-content").innerHTML = " "
    generateMoviesList(searchValue)
})