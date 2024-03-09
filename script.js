let MY_API_KEY = 'df282e64b5914978a9272441240903';


async function loadWeatherData(cityName) {
    let URL = `https://api.weatherapi.com/v1/forecast.json?key=${MY_API_KEY}&q=${cityName}&days=1&aqi=no&alerts=no`;
    let response = await fetch(URL);
    let data = await response.json();
    renderMainHTML(data);
    renderForecastHTML(data);
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
    <h3>${data.location.name}</h3>
    <p>${data.location.country}</p>
    <p>Temperature: ${data.current.temp_c}°C</p>
    <p>Wind: ${data.current.wind_kph}km/h</p>
    <p>Humidity: ${data.current.humidity}%</p>
    <p>Condition: ${data.current.condition.text}</p>
    <img src="${data.current.condition.icon}" alt="weather icon">
    <p>Last updated: ${myDate} local time</p>
    `;
}

function renderForecastHTML(data) {
    document.getElementById('forecast-section').innerHTML = '';

    data.forecast.forecastday[0].hour.forEach(hour => {
        let dateObj = new Date(hour.time);
        let hours = String(dateObj.getHours()).padStart(2, '0');
        let minutes = String(dateObj.getMinutes()).padStart(2, '0');

        // Überprüfung, ob die Stunde 06:00, 12:00, 18:00 oder 00:00 entspricht
        if (hours === '06' || hours === '12' || hours === '18' || hours === '00') {
            document.getElementById('forecast-section').innerHTML += /*html*/ `
            <div class="hourly-forecast">
                <p>${hours}:${minutes}</p>
                <img src="${hour.condition.icon}" alt="weather icon">
                <p>${hour.temp_c}°C</p>
            </div>
            `;
        }
    });
}