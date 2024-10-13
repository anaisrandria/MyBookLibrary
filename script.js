// CONNEXION A L'API (SANS AUTHORIZATION)
const options = {
    method: 'GET',
    headers: {
        Accept: 'application/json',
    }
}

const apiKey = 'AIzaSyAMkR99i88RXvSuDZ3CmZdbk5-zt8znpGE';


// RECUPERATION DES ELEMENTS DU DOM
const searchInput = document.getElementById('search-input');
const dropdownContainer = document.getElementById('dropdown-container');


// FONCTION PRINCIPALE
async function searchBook() {
    let requestString = `https://books.googleapis.com/books/v1/volumes?q=${searchInput.value}&printType=books&langRestrict=fr&key=${apiKey}`
    let data = await fetch(requestString, options);
    let response = await data.json();

    console.log(`Titre: ${response.items[0].volumeInfo.title} + id: ${response.items[0].id}`)

    if (dropdownContainer.innerHTML != null) {
        dropdownContainer.innerHTML = null;
    }

    response.items.forEach(book => { // Afficher la liste de résultats dans le dropdown container
        displayResults(book, response);
    })
} 

function displayResults(book, response) {
    const matchingResult = document.createElement("div");
    matchingResult.classList.add("matching-result");
    matchingResult.setAttribute("id", `${book.id}`);

    if (!book.volumeInfo.authors && !book.volumeInfo.publishedDate) {
        matchingResult.innerHTML = `${book.volumeInfo.title})`;
    } else if (!book.volumeInfo.authors) {
        matchingResult.innerHTML = `${
            book.volumeInfo.title
        }<br>(${book.volumeInfo.publishedDate.slice(0, 4)})`;
    } else if (!book.volumeInfo.publishedDate) {
        matchingResult.innerHTML = `${book.volumeInfo.title}<br><span>par ${book.volumeInfo.authors[0]}</span>`;
    } else {
        matchingResult.innerHTML = `${book.volumeInfo.title}<br><span>par ${
            book.volumeInfo.authors[0]
        } (${book.volumeInfo.publishedDate.slice(0, 4)})</span>`;
    }
    dropdownContainer.appendChild(matchingResult);

    if (response.length === 0) {
        noResults();
    }

};


// LANCEMENT DE LA FONCTION PRINCIPALE (RECHERCHE DANS L'API) A PARTIR D'UN INPUT UTILISATEUR
searchInput.addEventListener('input', searchBook);



// ADD EVENT LISTENER WHEN THE SEARCH BUTTON IS CLICKED 
// const searchButton = document.getElementById('search-button');

// searchButton.addEventListener("click", () => {

// });



// CLEANER LA LISTE 
// function clearList(){ 
//     // looping through each child of the search results list and remove each child
//     while (list.firstChild){
//         list.removeChild(list.firstChild);
//     }
// }

// AFFICHER UN MESSAGE D'ERREUR SI PAS DE RESULTAT 
function noResults(){
    const error = document.createElement('li');
    error.classList.add('error-message');

    const text = document.createTextNode('No results found.');
    error.appendChild(text);
    list.appendChild(error);
}


// ADD EVENT LISTENER WHEN INPUT IS TYPED INTO THE INPUT FORM

// searchInput.addEventListener('input', (e) => {
//         if (searchInput && searchInput.trim().length > 2){ // 2. check if input exists and if input is larger than 2
//             value = value.trim() // 3. redefine 'value' to exclude white space and change input to all lowercase
//             setList(matchingBooks.filter(book => { 
//                 // 4. returning only the results of setList() if the value of the search exists
//                 return book.title.includes(value);
//             }))
//         } else {
//             clearList()// 5. return nothing 
//         }
// });
