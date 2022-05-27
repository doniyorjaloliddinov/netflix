// FORM VARIABLES
let elFormMovie = $(".js-movie-form");
let elSearchInput = $(".js-search-input", elFormMovie);
let elCategoriesSelection = $(".js-categories-selection", elFormMovie);
let elRatingSelection = $(".js-moives-rating", elFormMovie);
let elAlphabetSelection = $(".js-alphabet-select", elFormMovie);
let elContentsTemplate = $("#movie-template").content;
let elReadyList = $(".js-movie-list",);
let elReadyMoviesBtn = $(".js-search-btn");
// console.log(elFormMovie,elSearchInput,elCategoriesSelection,elRatingSelection,elAlphabetSelection);


// NORMALIZED MOVIES ARRAY IN OBJECT
let normalizedMovies = movies.map((movie, i) => {
    return {
        id: i + 1,
        title: movie.Title.toString(),
        year: movie.movie_year,
        categories: movie.Categories.split("|").join(", "),
        rating: movie.imdb_rating,
        image: `http://i3.ytimg.com/vi/${movie.ytid}/hqdefault.jpg`,
        video: `https://www.youtube.com/watch?v=${movie.ytid}`,
    }

})
normalizedMovies.splice(50);
// console.log(normalizedMovies);


// READY CONTENT ELEMENTS AND MAKING FRAGMENT FUNC
let renderedMovies = () => {
    elReadyList.innerHTML = " ";
    let elResultFragment = document.createDocumentFragment();

    normalizedMovies.forEach((movie) => {
        let readyList = elContentsTemplate.cloneNode(true);

        $(".js-item-img", readyList).src = movie.image;
        $(".js-heading-item", readyList).textContent = movie.title;
        $(".movie-primier", readyList).textContent = movie.year;
        $(".js-movie-link", readyList).href = movie.video;
        $(".js-rating-movie", readyList).textContent = movie.rating;

        elResultFragment.appendChild(readyList);
    })
    elReadyList.appendChild(elResultFragment);
};
renderedMovies();``

let sortObjectsAZ = function (array) {
    return array.sort(function (a, b) {
        if (a.title > b.title) {
            return 1;
        } else if (a.title < b.title) {
            return -1;
        } else {
            return 0;
        }
    })
}


let sortSearchResults = function (results, sortType) {
    if (sortType === "az") {
        sortObjectsAZ(results);
    } else if (sortType === "za") {
        sortObjectsAZ(results).reverse();
    }
}

let findMovies = function (title, ratings) {
    return normalizedMovies.filter(function (movie) {
        return movie.title.match(title) && movie.rating >= ratings;
    });
}


// GENRES SELECTION FUNC 
let genresSelectionOption = () => {
    let movieCategories = [];


    normalizedMovies.forEach((movie) => {
        movie.categories.split(" ").forEach((category) => {
            if (!movieCategories.includes(category)) {
                movieCategories.push(category)
            }
        })
        movieCategories.sort();
    })

    let optionFragment = document.createDocumentFragment();

    movieCategories.forEach((category) => {
        let categoryOption = $$("option", category, "categoryOptions");

        optionFragment.append(categoryOption);
        elCategoriesSelection.append(categoryOption)
    })

}
genresSelectionOption();


// FORM FILTER FUNC 
elReadyMoviesBtn.addEventListener("change", (evt) => {
    evt.preventDefault();

    let searchResult = elSearchInput.value.trim();
    let searchMovies = new RegExp(searchResult, "gi");

    let minimumRating = Number(elRatingSelection.value);
    let sorting = elAlphabetSelection.value;

    let searchResults = findMovies(searchMovies, minimumRating);
    sortSearchResults(searchResults,sorting);

    // console.log(minimumRating, sorting);
    renderedMovies(searchResults);
});
