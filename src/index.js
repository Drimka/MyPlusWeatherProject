let now = new Date();
let apiKey = "6656788d9c9f0817f49bef13f8c59b1f";
let nowDate = document.querySelector(".current-date");
let nowDay = document.querySelector(".current-day-week");
let nowTime = document.querySelector(".current-time");
function currentDate(p) {
  return p.toLocaleDateString("en-us", {
    month: "long",
    day: "numeric",
  });
}
function currentDay(p) {
  return p.toLocaleDateString("en-us", {
    weekday: "long",
  });
}
function currentTime(p) {
  return p.toLocaleString("en-uk", {
    hour: "2-digit",
    minute: "2-digit",
  });
}
nowDate.innerHTML = currentDate(now);
nowDay.innerHTML = currentDay(now);
nowTime.innerHTML = `Last updated: ${currentTime(now)}`;

function forecastDate(timestamp) {
  let day = new Date(timestamp * 1000);
  return day.toLocaleDateString("en-us", {
    month: "short",
    day: "numeric",
  });
}
function forecastDayW(timestamp) {
  let day = new Date(timestamp * 1000);
  return day.toLocaleDateString("en-us", {
    weekday: "short",
  });
}

function showForecast(responce) {
  let forecastElement = document.querySelector("#forecast-block");
  let forecastHTML = ``;
  let forecastData = responce.data.daily;
  forecastData.pop();
  forecastData.shift();
  forecastData.forEach(function (data) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
            <img class="forecast forecast-icon" src="http://openweathermap.org/img/wn/${
              data.weather[0].icon
            }@2x.png" />
            <p class="forecast">
              <span class="temperature-forecast-max">${Math.round(
                data.temp.max
              )}°</span>... <span class="temperature-forecast-min">${Math.round(
        data.temp.min
      )}°</span>
            </p>
            <p class="forecast" class="forecast-date">${forecastDate(
              data.dt
            )}</p>
            <p class="forecast" class="forecast-day-week">${forecastDayW(
              data.dt
            )}</p>
          </div>`;
  });

  forecastElement.innerHTML = forecastHTML;
}

function getCityCoords(coords) {
  let apiLink = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiLink).then(showForecast);
}
function showWeather(responce) {
  let currentTemperature = document.querySelector(".current-temp");
  apiTemperature = responce.data.main.temp;
  currentTemperature.innerHTML = `${Math.round(apiTemperature)}°C`;
  document.querySelector("#current-city").innerHTML = responce.data.name;
  document.querySelector("#wind").innerHTML = responce.data.wind.speed;
  document.querySelector("#pressure").innerHTML = responce.data.main.pressure;
  document.querySelector("#humidity").innerHTML = responce.data.main.humidity;
  document.querySelector("#current-description").innerHTML =
    responce.data.weather[0].description;
  let currentIcon = document.querySelector("#current-icon");
  currentIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${responce.data.weather[0].icon}@2x.png`
  );
  celciusLink.classList.remove("non-active");
  farenheitLink.classList.add("non-active");
  getCityCoords(responce.data.coord);
}
function citySearch(city) {
  let apiLink = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiLink).then(showWeather);
}
function cityInput(event) {
  event.preventDefault();
  let city = document.querySelector("#change-city").value;
  citySearch(city);
}
let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", cityInput);

let celciusLink = document.querySelector("#celcius-change");
let farenheitLink = document.querySelector("#farenheit-change");
let currentTemperature = document.querySelector(".current-temp");
let forecastElement = document.querySelector("#forecast-block");
function celciusChange(event) {
  event.preventDefault();
  currentTemperature.innerHTML = `${Math.round(apiTemperature)}°C`;
  farenheitLink.classList.add("non-active");
  celciusLink.classList.remove("non-active");
  let city = document.querySelector("#current-city");
  let cityValue = city.innerHTML;
  forecastElement.classList.remove("under-construction");
  citySearch(cityValue);
}
function farenheitChange(event) {
  event.preventDefault();
  currentTemperature.innerHTML = `${Math.round(
    (apiTemperature * 9) / 5 + 32
  )}°F`;
  farenheitLink.classList.remove("non-active");
  celciusLink.classList.add("non-active");
  forecastElement.innerHTML = "🛠 Under construction 🛠";
  forecastElement.classList.add("under-construction");
}
celciusLink.addEventListener("click", celciusChange);
farenheitLink.addEventListener("click", farenheitChange);

function currentPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiLink = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiLink).then(showWeather);
}

function getLocation() {
  navigator.geolocation.getCurrentPosition(currentPosition);
}

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getLocation);

citySearch("Kyiv");
let apiTemperature = null;
