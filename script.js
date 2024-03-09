let MY_API_KEY = 'df282e64b5914978a9272441240903';


async function loadWeatherData(cityName) {
    let URL = `https://api.weatherapi.com/v1/forecast.json?key=${MY_API_KEY}&q=${cityName}&days=1&aqi=no&alerts=no`;
    let response = await fetch(URL);
    let data = await response.json();
    renderMainHTML(data);
}


function handleFormSubmit(event) {
    event.preventDefault();
    let cityName = document.getElementById('search-input').value;
    loadWeatherData(cityName); 
}

// HTML TEMPLATES -------------------------------------------------------------------------------------------------------

function renderMainHTML(data){
    let dateObj = new Date(data.location.localtime);

    // Extrahieren der Datumsteile
    let day = String(dateObj.getDate()).padStart(2, '0');
    let month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Monate beginnen bei 0
    let year = dateObj.getFullYear();

    // Extrahieren der Zeitteile
    let hours = String(dateObj.getHours()).padStart(2, '0');
    let minutes = String(dateObj.getMinutes()).padStart(2, '0');

    // Zusammenfügen des Datums im gewünschten Format
    let myDate = `${day}.${month}.${year} - ${hours}:${minutes}`;

    document.getElementById('main-section').innerHTML = '';
    document.getElementById('main-section').innerHTML = /*html*/ `
    <h2>${data.location.name}</h2>
    <p>${data.location.country}</p>
    <p>${data.current.temp_c}°C</p>
    <p>${data.current.condition.text}</p>
    <img src="${data.current.condition.icon}" alt="weather icon">
    <p>Last updated: ${myDate} local time</p>
    `;
}
