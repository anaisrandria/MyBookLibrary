// CONNEXION A L'API GOOGLE BOOKS (SANS AUTHORIZATION)
const options = {
    method: 'GET',
    headers: {
        Accept: 'application/json',
    }
}

const apiKey = 'AIzaSyAMkR99i88RXvSuDZ3CmZdbk5-zt8znpGE';

// RECHERCHE DANS L'API A PARTIR D'UN INPUT 
const searchInput = document.getElementById('search-input');
const suggestionsDropdown = document.getElementById("suggestions-dropdown");


// FONCTION PRINCIPALE
async function searchBook() {
    let requestString = `https://books.googleapis.com/books/v1/volumes?q="${searchInput.value}"&printType=books&orderBy=relevance&langRestrict=fr&key=${apiKey}`
    let data = await fetch(requestString, options);
    let response = await data.json();

    for (let i=0; i < response.items.length; i++) {
        console.log('titre:', response.items[i]);
    }
    
    if (suggestionsDropdown.innerHTML != null) {
            suggestionsDropdown.innerHTML = null;
    }

    response.items.forEach(book => { // Afficher la liste de résultats sur la page
        const suggestionItem = document.createElement('div');
        suggestionItem.classList.add('suggestion-item'); 
        suggestionItem.textContent = `${book.volumeInfo.title} (${book.volumeInfo.publishedDate})`;
        suggestionsDropdown.appendChild(suggestionItem);

        if (response.length === 0){
            noResults()
        }
    })
} 



searchInput.addEventListener('input', searchBook)



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
