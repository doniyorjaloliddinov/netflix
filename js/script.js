// VARIABLES
let elFormMovie = $(".js-movie-form");
let elSearchInput = $(".js-search-input", elFormMovie);
let elReadyList = $(".js-movie-list");
let elTemplateMovie = $("#movie-template").content;
// console.log(elFormMovie,elSearchInput, elReadyList, elTemplateMovie);
movies.splice(10);

// MAKING MOVIE ARRAY MORE CLEAR
let normalizedMovies = movies.map((movie, i) => {
    return movie = {
        id: i + 1,
        img: movie.img,
        title: movie.Title,
        year: movie.movie_year,
        info: movie.summary,
        video: movie.ytid
    }
})
// console.log(normalizedMovies);

// CREATING READY ELEMENTS
let creatReadyElements = (movie) => {
    let readyElements = elTemplateMovie.cloneNode(true);

    $(".js-item-img", readyElements).src = movie.img;
    $(".js-item-img", readyElements).alt = movie.title;
    $(".js-heading-item", readyElements).textContent = movie.title;
    $(".js-item-img", readyElements).textContent = movie.year;
    $(".js-movie-about", readyElements).textContent = movie.info;
    $(".js-movie-link", readyElements).href = `https://www.youtube.com/watch?v=${movie.video}`;
    $(".js-movie-link", readyElements).target = "_blank";

    return readyElements;
}
// console.log(readyElements);

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
elFormMovie.addEventListener("submit", (e) => {
    e.preventDefault();

    let searchRegExp = new RegExp(elSearchInput.value.trim(), "gi");

    let readyList = normalizedMovies.filter((movie) => {
        if (movie.title.match(searchRegExp)) {
            return movie.title.match(searchRegExp)
            console.log("something");
        }
        // else {
        //     console.log("No such kind of movie");
        // }
    })
    renderMovies(readyList);
});

// console.log(movies);