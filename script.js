// ---------- RECUPERATION DES ELEMENTS DU DOM ---------- //
const searchInput = document.querySelector("#search-input");
const dropdownContainer = document.querySelector("#dropdown-container");
const booksContainer = document.querySelector(".books-container");
const gettingStarted = document.querySelector("#getting-started");


// ---------- DÉFINITION DE CLASSE ---------- //
class Book {
	constructor(title, author, publishedDate) {
		this.title = title;
		this.author = author;
		this.publishedDate = publishedDate;
	}

	// get title() {
	// 	return this.title;
	// }
	// get author() {
	// 	return this.author;
	// }
    // get publishedDate() {
    //     return this.publishedDate;
    // }
}

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
    newBook = new Book(book.volumeInfo.title, book.volumeInfo.authors, book.volumeInfo.publishedDate);
    console.log("🍄", newBook);

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

    hideExplore();
}

// ---------- MASQUER GETTING STARTED DÈS QU'UNE SECTION DE LECTURE EST NON VIDE ---------- //
function hideExplore() {
    if (booksContainer.innerHTML != "") {
        gettingStarted.innerHTML = ""
    }
}

// ---------- FERMER DROPDOWN ET CLEANER INPUT SI CLIC À L'EXTÉRIEUR DU CONTAINER ---------- //
document.addEventListener("click", (event) => {
    const isClickInside = dropdownContainer.contains(event.target)
    if (!isClickInside) {
        dropdownContainer.innerHTML = null;
        searchInput.value = "";
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