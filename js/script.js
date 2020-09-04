const resultsNav = document.getElementById('resultsNav');
const favoritesNav = document.getElementById('favoritesNav');
const imagesContainer = document.querySelector('.images-container');
const saveConfirmed = document.querySelector('.save-confirmed');
const loader = document.querySelector('.loader');

const apiKey = 'DEMO_KEY';
const count = 10;
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let resultsArray = [];

async function getNASAPictuers() {
    try {
       const response = await fetch(apiUrl);
       resultsArray = await response.json();
       console.log(resultsArray);
       updateDOM()
    } catch (error) {
        
    }
}

function updateDOM() {
    resultsArray.forEach(result => {
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
        addToFavoritesBTN.textContent = 'Add to Favorites';
        // card text
        const cardText = document.createElement('p');
        cardText.classList.add('card-text');
        cardText.textContent = result.explanation;
        // text muted
        const textMuted = document.createElement('small');
        textMuted.classList.add('text-muted');
        const dateElem = document.createElement('strong');
        dateElem.textContent = result.date;
        const copyrightInfo = document.createElement('span');
        copyrightInfo.textContent = ` ${result.copyright}`;
        //append
        textMuted.append(dateElem, copyrightInfo);
        cardBody.append(cardTitle, addToFavoritesBTN, cardText, textMuted);
        imageLink.appendChild(image);
        card.append(imageLink, cardBody);
        imagesContainer.appendChild(card);

    });
}

getNASAPictuers()