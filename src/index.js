let now = new Date();
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
    second: "2-digit",
  });
}
nowDate.innerHTML = currentDate(now);
nowDay.innerHTML = currentDay(now);
nowTime.innerHTML = currentTime(now);

function showWeather(responce) {
  let currentTemperature = document.querySelector(".current-temp");
  let apiTemperature = Math.round(responce.data.main.temp);
  currentTemperature.innerHTML = `${apiTemperature}°C`;
  document.querySelector("#current-city").innerHTML = responce.data.name;
  document.querySelector("#wind").innerHTML = responce.data.wind.speed;
  document.querySelector("#pressure").innerHTML = responce.data.main.pressure;
  document.querySelector("#humidity").innerHTML = responce.data.main.humidity;
}
function citySearch(city) {
  let apiKey = "6656788d9c9f0817f49bef13f8c59b1f";
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
function celciusChange() {
  currentTemperature.innerHTML = "+25°C";
}
function farenheitChange() {
  currentTemperature.innerHTML = "+77°F";
}
celciusLink.addEventListener("click", celciusChange);
farenheitLink.addEventListener("click", farenheitChange);

// function getCurrentLocationTemp(responce) {
//   document.querySelector("#current-city").innerHTML = responce.data.name;
//   let temperature = document.querySelector(".current-temp");
//   let apiTemperature = Math.round(responce.data.main.temp);
//   temperature.innerHTML = `${apiTemperature} °C`;
//   document.querySelector("#wind").innerHTML = responce.data.wind.speed;
//   document.querySelector("#pressure").innerHTML = responce.data.main.pressure;
//   document.querySelector("#humidity").innerHTML = responce.data.main.humidity;
//}
function currentPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "6656788d9c9f0817f49bef13f8c59b1f";
  let apiLink = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiLink).then(showWeather);
}

function getLocation() {
  navigator.geolocation.getCurrentPosition(currentPosition);
}

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getLocation);

citySearch("Kyiv");
