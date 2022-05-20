// VARIABLES
let elFormMovie = $(".js-movie-form");
let elSearchInput = $(".js-search-input", elFormMovie);
let elReadyList = $(".js-movie-list");
let elTemplateMovie = $("#movie-template").content;
// console.log(elFormMovie,elSearchInput, elReadyList, elTemplateMovie);
movies.splice(100);

// MAKING MOVIE ARRAY MORE CLEAR
let normalizedMovies = movies.map((movie, i) => {
    return movie = {
        id: i + 1,
        image: `http://i3.ytimg.com/vi/${movie.ytid}/hqdefault.jpg`,
        title: movie.Title,
        year: movie.movie_year,
        info: movie.summary,
        video: movie.ytid
    }
})
// console.log(normalizedMovies);

// CREATING READY ELEMENTS
let creatReadyElements = (movie) => {
elReadyList.innerHTML = "";

    let readyElements = elTemplateMovie.cloneNode(true);

    $(".js-item-img", readyElements).src = movie.image;
    $(".js-item-img", readyElements).alt = movie.title;
    $(".js-heading-item", readyElements).textContent = movie.title;
    $(".movie-primier", readyElements).textContent = movie.year;
    $(".js-movie-link", readyElements).href = `https://www.youtube.com/watch?v=${movie.video}`;
    $(".js-movie-link", readyElements).target = "_blank";

    return readyElements;
}


// CREATING FUNCTION FRAGMENT
let renderMovies = (movies) => {
    let elResultFragment = document.createDocumentFragment();

    movies.forEach((movie) => {
        elResultFragment.appendChild(creatReadyElements(movie));
    })

    elReadyList.appendChild(elResultFragment);
}

renderMovies(normalizedMovies);
// console.log(renderMovies(normalizedMovies));

// SEARCH INPPUT FUNCTION
// debugger;
elFormMovie.addEventListener("submit", (e) => {
    e.preventDefault();

    let searchMovies = new RegExp(elSearchInput.value.trim(), "gi");

    let searchResult = normalizedMovies.filter((movie) => {
        if(movie.title.match(searchMovies)) {
            return movie.title.match(searchMovies);
            console.log("smth ");
        }
    })
    renderMovies(searchResult);

    console.log(renderMovies(searchResult));
});