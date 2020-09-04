const apiKey = 'DEMO_KEY';
const count = 10;
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let resultsArray = [];

async function getNASAPictuers() {
    try {
       const response = await fetch(apiUrl);
       resultsArray = await response.json();
       console.log(resultsArray);
    } catch (error) {
        
    }
}

getNASAPictuers()