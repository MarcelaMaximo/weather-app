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

//city at h1
let h1 = document.querySelector("#city");

function Country(event) {
  event.preventDefault();
  let SearchCity = document.querySelector("#Search-City");
  h1.innerHTML = `${SearchCity.value}`;
}

let CitySearch = document.querySelector("#search-form");
CitySearch.addEventListener("submit", Country);


//location

function showWeather(response) {

  
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
  MaxElement.innerHTML = Math.round(response.data.main.temp_max);
  MinElement.innerHTML = Math.round(response.data.main.temp_min);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

}
function displayForecast (response) {
  console.log(response.data.list[0]);
  
  let forecastElement = document.querySelector("#forecast");
  let forecast= response.data.list[0];
  console.log(forecast);

  forecastElement.innerHTML = `
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
    <span>
    <i class="fas fa-arrow-up"> </i>${Math.round(forecast.main.temp_max)}°C 
    <i class="fas fa-arrow-down"> </i>${Math.round(forecast.main.temp_min)}°C
    </span>    
    </div>
    `;

  }


function handleSubmit(event) {
  event.preventDefault();

  let city = document.querySelector("#Search-City").value;
  let apiKey = "746b6a26dadd45390800e5861cc58856"; 
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function CurrentPosition(position) {
  let apiKey = "746b6a26dadd45390800e5861cc58856";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(showWeather);
}

function GetCurrentPosition() {
  navigator.geolocation.getCurrentPosition(CurrentPosition);
}



let locationButton = document.querySelector("#CurrentButton");
locationButton.addEventListener("click", GetCurrentPosition);

//temperature

function convertF(event) {
  event.preventDefault();
  let temperatureElement= document.querySelector("#temperature");
  let fahrenheitemperature = (celsiusTemperature* 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitemperature);
}

function convertC(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let fahrenheit = document.querySelector("#f-link");
fahrenheit.addEventListener("click", convertF);

let celsius = document.querySelector("#c-link");
celsius.addEventListener("click", convertC);



let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let celsiusTemperature = null;