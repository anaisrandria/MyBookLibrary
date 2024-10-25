// ---------- RECUPERATION DES ELEMENTS DU DOM ---------- //
const searchInput = document.querySelector("#search-input");
const dropdownContainer = document.querySelector("#dropdown-container");
const booksContainer = document.querySelector(".books-container");


// ---------- FONCTION PRINCIPALE ---------- //
async function fetchApi() {
    const requestString = `https://books.googleapis.com/books/v1/volumes?q=${searchInput.value}&printType=books&langRestrict=fr&key=${apiKey}`
    const data = await fetch(requestString, options);
    const response = await data.json();

    console.log("🐣", response);
    // console.log("🪲", response.items[0]);
    // console.log(`Titre: ${response.items[0].volumeInfo.title} + id: ${response.items[0].id}`);

    if (dropdownContainer.innerHTML != null) {
        dropdownContainer.innerHTML = null;
    };

    if (response.totalItems !== 0) {
        response.items.slice(0,5).forEach(book => {
            displayResults(book);
        });
    } else {
        noResults();
    };
}; 


// ---------- LANCEMENT DE LA FONCTION FETCH API À PARTIR D'UN INPUT UTILISATEUR ---------- //
let timer = 0;

searchInput.addEventListener('input', () => {
    clearTimeout(timer);
    timer = setTimeout(function () {
        if (searchInput.value !== "") {
            fetchApi();
        } else {
            dropdownContainer.innerHTML = "";
        }
    }, 300);
});


// ---------- AFFICHER DROPDOWN LIST ---------- //
function displayResults(book) {
    const matchingResult = document.createElement("button");
    matchingResult.classList.add("matching-result");
    matchingResult.setAttribute("id", book.id);

    const textContainer = document.createElement("div");
	textContainer.classList.add("text-container");

    const miniThumbnail = document.createElement("img");
    miniThumbnail.classList.add("mini-thumbnail");
    if (book.volumeInfo.imageLinks) {
        miniThumbnail.setAttribute("src", book.volumeInfo.imageLinks.thumbnail);
    } else {
        miniThumbnail.setAttribute("src", "assets/missingbook.jpg");
    };

    const title = document.createElement("p");
    title.innerHTML = book.volumeInfo.title;

    const bookInformation = document.createElement("p");
    if (!book.volumeInfo.authors) {
        bookInformation.innerHTML = `<span>(${book.volumeInfo.publishedDate.slice(0, 4)})</span>`;
    } else if (!book.volumeInfo.publishedDate) {
        bookInformation.innerHTML = `<span>par ${book.volumeInfo.authors[0]}</span>`;
    } else {
        bookInformation.innerHTML = `<span>par ${book.volumeInfo.authors[0]} (${book.volumeInfo.publishedDate.slice(0, 4)})</span>`;
    };
    
    textContainer.appendChild(title);
    textContainer.appendChild(bookInformation);
    matchingResult.appendChild(miniThumbnail);
    matchingResult.appendChild(textContainer);
    dropdownContainer.appendChild(matchingResult);
 
    matchingResult.addEventListener("click", () => addBookToList(book))

    return matchingResult;
};

// ---------- AJOUTER LIVRE CLIQUÉ À UNE LISTE DE LECTURE ---------- //
function addBookToList(book) {
	console.log(`Bouton cliqué pour ${book.volumeInfo.title} !`);
	const thumbnail = document.createElement("img");
	thumbnail.classList.add("thumbnail");
	if (book.volumeInfo.imageLinks) {
		thumbnail.setAttribute("src", book.volumeInfo.imageLinks.thumbnail);
	} else {
		thumbnail.setAttribute("src", "assets/missingbook.jpg");
	}

	booksContainer.appendChild(thumbnail);
}


// ---------- FERMER DROPDOWN LIST SI CLIC À L'EXTÉRIEUR DU CONTAINER ---------- //
document.addEventListener("click", (event) => {
    const isClickInside = dropdownContainer.contains(event.target)
    if (!isClickInside) {
        dropdownContainer.innerHTML = null;
    }
})

// ---------- AFFICHER UN MESSAGE D'ERREUR SI PAS DE RESULTAT ---------- //
function noResults(){
    const matchingResult = document.createElement("div");
	matchingResult.classList.add("matching-result");

    const error = document.createElement("p");
    error.innerHTML = "Pas de résultat.";

    matchingResult.appendChild(error);
    dropdownContainer.appendChild(matchingResult);
};