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
nowTime.innerHTML = currentTime(now);

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
function celciusChange(event) {
  event.preventDefault();
  currentTemperature.innerHTML = `${Math.round(apiTemperature)}°C`;
  farenheitLink.classList.add("non-active");
  celciusLink.classList.remove("non-active");
}
function farenheitChange(event) {
  event.preventDefault();
  currentTemperature.innerHTML = `${Math.round(
    (apiTemperature * 9) / 5 + 32
  )}°F`;
  farenheitLink.classList.remove("non-active");
  celciusLink.classList.add("non-active");
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
