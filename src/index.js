//Date and Time
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

//Show weather characteristics
function showWeatherNow(response) {
  let weatherSpan = document.querySelector("#temperatureNow");

  celsiusTemperature = response.data.main.temp;

  let temperature = Math.round(celsiusTemperature);
  weatherSpan.innerHTML = temperature;
  if (temperature > 15) {
    let greeting = document.querySelector("#message");
    greeting.innerHTML = "Don't forget to drink water!💦";
    let mainImage = document.querySelector("#penguin-image");
    mainImage.src = "images/yellowpenguin2.gif";
  } else {
    let greeting = document.querySelector("#message");
    greeting.innerHTML = "Don't forget your scarf!🧣";
    let mainImage = document.querySelector("#penguin-image");
    mainImage.src = "images/autumnpenguin2.gif";
  }
  //Name of the city
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
  //Weather description
  let descriptionElement = document.querySelector("#description-weather");
  let weatherName = response.data.weather[0].description;
  descriptionElement.innerHTML = weatherName;
  //Top icon
  let iconElement = document.querySelector("#top-icon");
  let icon = response.data.weather[0].icon;
  iconElement.setAttribute("src", `images/${icon}.svg`);
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

//Temperature - Celsius or Fahrenheit
function showFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperatureNow");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperatureNow");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);

//Current position
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
