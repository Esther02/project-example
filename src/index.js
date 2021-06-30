//Feature 1 - Date and Time
let now = new Date();

let dateTime = document.querySelector("#date-time");

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];

dateTime.innerHTML = `${day}  ${hours}:${minutes}`;

//Feature 2 - Add a search engine, when searching for a city (i.e. Paris), display the city name on the page after the user submits the form.
//function signUp(event) {
//  event.preventDefault();
// let input = document.querySelector("#form-input");
// let currentCity = document.querySelector("#current-city");
// currentCity.innerHTML = `${input.value}`;
//}
//let form = document.querySelector("#form-search");
//form.addEventListener("submit", signUp);

//BONUS! Display a fake temperature (i.e 17) in Celsius and add a link to convert it to Fahrenheit.

//When clicking on Celsius, it should convert it back to Celsius.
//function temperatureDisplayCelcius(event) {
//event.preventDefault();
//let currentTemperatureC = document.querySelector("#temperatureNow");
//currentTemperatureC.innerHTML = 17;
//}

//let celciusLink = document.querySelector("#celsius-link");
//celciusLink.addEventListener("click", temperatureDisplayCelcius);

// When clicking on it, it should convert the temperature to Fahrenheit.

//function temperatureDisplayFahrenheit(event) {
//event.preventDefault();
// let currentTemperatureFahrenheit = document.querySelector("#temperatureNow");
// currentTemperatureFahrenheit.innerHTML = 62;
//}

//let fahrenheitLink = document.querySelector("#fahrenheit-link");
//fahrenheitLink.addEventListener("click", temperatureDisplayFahrenheit);

//when a user searches for a city (example: New York),
//it should display the name of the city on the result page and the current temperature of the city.

//Challenge 1
function showWeatherNow(response) {
  let weatherSpan = document.querySelector("#temperatureNow");
  let temperature = Math.round(response.data.main.temp);
  weatherSpan.innerHTML = temperature;
  if (temperature > 15) {
    let greeting = document.querySelector("#message");
    greeting.innerHTML = "Don't forget to drink water!";
    let mainImage = document.querySelector("#penguin-image");
    mainImage.src = "images/yellowpenguin2.gif";
  } else {
    let greeting = document.querySelector("#message");
    greeting.innerHTML = "Don't forget your coat!";
    let mainImage = document.querySelector("#penguin-image");
    mainImage.src = "images/autumnpenguin2.gif";
  }
  //Name
  let currentCity = document.querySelector("#current-city");
  let cityName = response.data.name;
  currentCity.innerHTML = cityName;
  //Humidity
  let humiditySelection = document.querySelector("#current-humidity");
  let humidity = response.data.main.humidity;
  humiditySelection.innerHTML = humidity;
  //Wind
  let windSelection = document.querySelector("#current-wind");
  let wind = Math.round(response.data.wind.speed);
  windSelection.innerHTML = wind;
}

function singUp(event) {
  event.preventDefault();
  let input = document.querySelector("#form-input");
  let currentCity = document.querySelector("#current-city");
  let city = input.value;
  currentCity.innerHTML = city;
  let apiKey = "c34aa44e18e48aaa2ad40e6619e01c0c";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeatherNow);
}
let form = document.querySelector("#form-search");
form.addEventListener("submit", singUp);

//Challenge 2
function handlePosition(position) {
  let apiKey = "c34aa44e18e48aaa2ad40e6619e01c0c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeatherNow);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let button = document.querySelector("#current-button");
button.addEventListener("click", currentLocation);
