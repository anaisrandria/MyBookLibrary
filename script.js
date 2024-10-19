// ---------- RECUPERATION DES ELEMENTS DU DOM ---------- //
const searchInput = document.getElementById('search-input');
const dropdownContainer = document.getElementById('dropdown-container');


// ---------- FONCTION PRINCIPALE ---------- //
async function fetchApi() {
    const requestString = `https://books.googleapis.com/books/v1/volumes?q=${searchInput.value}&printType=books&langRestrict=fr&key=${apiKey}`
    const data = await fetch(requestString, options);
    const response = await data.json();

    console.log("🐣", response);
    // console.log("🪲", response.items[0]);
    // console.log(`Titre: ${response.items[0].volumeInfo.title} + id: ${response.items[0].id}`);

    // Afficher 5 nouveaux résultats à chaque fetch de l'api
    if (dropdownContainer.innerHTML != null) {
        dropdownContainer.innerHTML = null;
    }

    if (response.totalItems !== 0) {
        response.items.slice(0,5).forEach(book => {
            displayResults(book, response);
        });
    }
}; 


// LANCEMENT DE LA FONCTION FETCH API A PARTIR D'UN INPUT UTILISATEUR
let timer = 0;

searchInput.addEventListener('input', () => {
    clearTimeout(timer);
    timer = setTimeout(function () {
        if (searchInput.value !== "") {
            fetchApi();
        } else {
            dropdownContainer.innerHTML = "";
        }
    }, 500);
});


// ---------- AFFICHER DROPDOWN LIST ---------- //
function displayResults(book, response) {
    const matchingResult = document.createElement("div");
    matchingResult.classList.add("matching-result");
    matchingResult.setAttribute("id", `${book.id}`);
    
    const textContainer = document.createElement("div");
    textContainer.classList.add("text-container");
    
    const thumbnail = document.createElement("img");
    thumbnail.classList.add("thumbnail");
    if (book.volumeInfo.imageLinks) {
        thumbnail.setAttribute("src", `${book.volumeInfo.imageLinks.thumbnail}`);
    } else {
        thumbnail.setAttribute("src", "assets/missingbook.jpg");
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
    }
 
    textContainer.appendChild(title);
    textContainer.appendChild(bookInformation);
    matchingResult.appendChild(thumbnail);
    matchingResult.appendChild(textContainer);
    dropdownContainer.appendChild(matchingResult);

    if (response.totalItems === 0) {
        noResults();
    }

};


// AFFICHER UN MESSAGE D'ERREUR SI PAS DE RESULTAT 
function noResults(){
    const error = document.createElement('li');
    error.classList.add('error-message');

    const text = document.createTextNode('No results found.');
    error.appendChild(text);
    list.appendChild(error);
};
