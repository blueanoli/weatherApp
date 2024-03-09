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
    document.getElementById('main-section').innerHTML = '';
    document.getElementById('main-section').innerHTML = `
    <h2>${data.location.name}</h2>
    <p>${data.location.country}</p>
    <p>${data.current.temp_c}°C</p>
    <p>${data.current.condition.text}</p>
    `;
}
