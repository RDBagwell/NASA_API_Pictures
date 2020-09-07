const resultsNav = document.getElementById('resultsNav');
const favoritesNav = document.getElementById('favoritesNav');
const imagesContainer = document.querySelector('.images-container');
const saveConfirmed = document.querySelector('.save-confirmed');
const loader = document.querySelector('.loader');

const apiKey = 'DEMO_KEY';
const count = 10;
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let resultsArray = [];
let favorites = {};

function showContent(page) {
    window.scrollTo({
        top: 0,
        behavior: 'instant'
    });
    if(page === 'results'){
        resultsNav.classList.remove('hidden');
        favoritesNav.classList.add('hidden');
    } else {
        resultsNav.classList.add('hidden');
        favoritesNav.classList.remove('hidden'); 
    }
    loader.classList.add('hidden');
}

async function getNASAPictuers() {
    // loader.classList.remove('hidden');
    try {
       const response = await fetch(apiUrl);
       resultsArray = await response.json();
       updateDOM('results');
    } catch (error) {
        
    }
}

function createDOMNodes(page) {
    const currentArray = page === 'results' ? resultsArray : Object.values(favorites) ;
    console.log(page);
    currentArray.forEach(result => {
        // card element
        const card = document.createElement('div');
        card.classList.add('card');
        // image link
        const imageLink = document.createElement('a');
        imageLink.href = result.hdurl;
        imageLink.title = 'View full Image';
        imageLink.target = '_blank';
        // image 
        const image = document.createElement('img')
        image.src = result.url;
        image.alt = 'NASA Picture of the Day';
        image.loading = 'lazy';
        image.classList.add('card-img-top');
        // card body
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
        // card title
        const cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title');
        cardTitle.textContent = result.title;
        // Add to Favorites BTN
        const addToFavoritesBTN = document.createElement('p');
        addToFavoritesBTN.classList.add('clickable');
        if(page === 'results'){
            addToFavoritesBTN.textContent = 'Add to Favorites';
            addToFavoritesBTN.setAttribute('onclick', `saveFavorites('${result.url}')`) ;
        } else {
            addToFavoritesBTN.textContent = 'Remove From Favorites';
            addToFavoritesBTN.setAttribute('onclick', `removeFavorites('${result.url}')`) ;
        }
        // card text
        const cardText = document.createElement('p');
        cardText.classList.add('card-text');
        cardText.textContent = result.explanation;
        // text muted
        const textMuted = document.createElement('small');
        textMuted.classList.add('text-muted');
        //date
        const dateElem = document.createElement('strong');
        dateElem.textContent = result.date;
        //copyright
        const copyrightResult = result.copyright === undefined ? '' : result.copyright;
        const copyrightInfo = document.createElement('span');
        copyrightInfo.textContent = ` ${copyrightResult}`;
        //append
        textMuted.append(dateElem, copyrightInfo);
        cardBody.append(cardTitle, addToFavoritesBTN, cardText, textMuted);
        imageLink.appendChild(image);
        card.append(imageLink, cardBody);
        imagesContainer.appendChild(card);

    });
}

function updateDOM(page) {
    if(localStorage.getItem('NASAFavorites')){
        favorites = JSON.parse(localStorage.getItem('NASAFavorites'));
    }
    imagesContainer.textContent = ''
    createDOMNodes(page);
    showContent(page);
}

function saveFavorites(itemUrl) {
    resultsArray.forEach(item => {
        if(item.url.includes(itemUrl) && !favorites[itemUrl]){
            favorites[itemUrl] = item;

            saveConfirmed.hidden = false;
            setTimeout(() => {
                saveConfirmed.hidden = true;
            }, 2000);

            localStorage.setItem('NASAFavorites', JSON.stringify(favorites));
        }
    });
}

function removeFavorites(itemUrl) {
    if(favorites[itemUrl]){
        delete favorites[itemUrl];
        localStorage.setItem('NASAFavorites', JSON.stringify(favorites));
        updateDOM('favorites');
    }
}

getNASAPictuers()