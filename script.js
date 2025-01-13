const API_KEY = "your_api_key_here"; // Replace with your OpenWeatherMap API key
const weatherDataSection = document.getElementById("weather-data");
const errorMessage = document.getElementById("error-message");

const locationInput = document.getElementById("location-input");
const searchButton = document.getElementById("search-button");
const currentLocationButton = document.getElementById("current-location-button");

const locationName = document.getElementById("location-name");
const weatherDescription = document.getElementById("weather-description");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");

function fetchWeatherData(query) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${API_KEY}`;
  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error("Weather data not found.");
      }
      return response.json();
    })
    .then(data => displayWeatherData(data))
    .catch(() => showErrorMessage());
}

function fetchWeatherDataByCoords(lat, lon) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error("Weather data not found.");
      }
      return response.json();
    })
    .then(data => displayWeatherData(data))
    .catch(() => showErrorMessage());
}

function displayWeatherData(data) {
  weatherDataSection.classList.remove("hidden");
  errorMessage.classList.add("hidden");

  locationName.textContent = data.name;
  weatherDescription.textContent = data.weather[0].description;
  temperature.textContent = data.main.temp.toFixed(1);
  humidity.textContent = data.main.humidity;
  windSpeed.textContent = data.wind.speed.toFixed(1);
}

function showErrorMessage() {
  weatherDataSection.classList.add("hidden");
  errorMessage.classList.remove("hidden");
}

searchButton.addEventListener("click", () => {
  const location = locationInput.value.trim();
  if (location) {
    fetchWeatherData(location);
  }
});

currentLocationButton.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        fetchWeatherDataByCoords(latitude, longitude);
      },
      () => showErrorMessage()
    );
  } else {
    showErrorMessage();
  }
});
