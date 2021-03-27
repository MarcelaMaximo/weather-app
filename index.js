//time

let now = new Date();

let h2 = document.querySelector("h2");

let dates = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let date = dates[now.getDay()];

h2.innerHTML = `${date}`;

let h3 = document.querySelector("h3");

let day = now.getDate();

let months = [
  "Jan",
  "Fev",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
let month = months[now.getMonth()];

h3.innerHTML = `${day} ${month}`;

let h4 = document.querySelector("h4");

function Time() {
  let hours = now.getHours();
  let minutes = now.getMinutes();

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  h4.innerHTML = `${hours}:${minutes}`;
}
Time();


function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}


//location

function displayTemperature(response) {
  
  let countryElement = document.querySelector("#country");
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let MaxElement = document.querySelector("#Max");
  let MinElement = document.querySelector("#Min");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature=response.data.main.temp; 

  countryElement.innerHTML= (response.data.sys.country);
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = `${response.data.name},`;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  MaxElement.innerHTML =  Math.round(response.data.main.temp_max);
  MinElement.innerHTML =  Math.round(response.data.main.temp_min);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

}
function displayForecast (response) {
  
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast= null;
 
  for (let index = 0; index < 6; index++) {

    forecast= response.data.list[index];
    forecastElement.innerHTML += `
      <div class="col align-self-center">
        <div class="day">
          ${formatHours(forecast.dt * 1000)}
        </div>
        <div class="img">
        <img
        class="leftImg";
          src="http://openweathermap.org/img/wn/${
            forecast.weather[0].icon
          }@2x.png"
        />
        </div>
        <span class="left-temp">
        <i class="fas fa-arrow-up"> </i>${Math.round(forecast.main.temp_max)}°C 
        <i class="fas fa-arrow-down"> </i>${Math.round(forecast.main.temp_min)}°C
        </span>    
        </div>
      </div>
  `;
  }
  }

function search(city) {
  let apiKey = "746b6a26dadd45390800e5861cc58856";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#Search-City");
  search(cityInputElement.value);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();

  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#f-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#c-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Lisbon");