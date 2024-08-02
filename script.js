// GENERATING RANDOM QUOTES 

const citationsArray = [
    `"La lecture commencer les yeux fermés" - Yvon Rivard`,
    `“Une lecture amusante est aussi utile à la santé que l’exercice du corps.” - Emmanuel Kant`,
    `“Une heure de lecture est le souverain remède contre les dégoûts de la vie.” - Montesquieu`,
    `“La lecture est à l'esprit ce que l'exercice est au corps.” - J. Addison`,
    `“Lire haut, c'est s'affirmer à soi-même sa lecture.” - Victor Hugo`,
    `“Je déclare qu'après tout, il n'y a pas de plaisir qui vaille la lecture !” - Jane Austen`,
    `“La vraie lecture commence quand on ne lit plus seulement pour se distraire et se fuir, mais pour se trouver.” - Jean Guéhenno`,
    `“La lecture est pour moi le contraire de l'écriture. Je n'ai pas de rites : c'est pour me détendre, rire, pleurer, rêver.” - Nathalie Rheims`,
    `“Ne plus lire depuis longtemps, c’est comme perdre un ami important.” - Proverbe chinois`,
    `“Dans la lecture solitaire, l'homme qui se cherche lui-même a quelque chance de se rencontrer.” - Georges Duhamel`,
    `“La lecture, une porte ouverte sur un monde enchanté.” - François Mauriac`,
    `"La lecture est une amitié." - Marcel Proust`,
    `“Le choix d’un bon livre n’est pas moins difficile que la lecture en est agréable.” - Chevalier de Méré`,
    `“La lecture d’un roman jette sur la vie une lumière.” - Louis Aragon`,
    `“Il n’y a vraiment que deux choses qui puissent faire changer un être humain : un grand amour ou la lecture d’un grand livre.” - Paul Desalmand`
]

function getRandomCitation() {
    return citationsArray[Math.floor(Math.random() * citationsArray.length)];
}

function displayRandomCitation() {
    const citation = document.getElementById("citation");
    citation.innerHTML = `${getRandomCitation()}`
}

displayRandomCitation()