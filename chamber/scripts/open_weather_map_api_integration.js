// OpenWeatherMap API Integration
const apiKey = 'd74ad4179e6d2cc6b9b16f5388e0bc6a'; 
const apiUrlCurrent = `https://api.openweathermap.org/data/2.5/weather?q=Timbuktu&units=imperial&appid=${apiKey}`;
const apiUrlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=Timbuktu&units=imperial&appid=${apiKey}`;

const fetchWeatherData = async () => {
  try {
    // Fetch current weather data
    const responseCurrent = await fetch(apiUrlCurrent);
    const dataCurrent = await responseCurrent.json();
    document.getElementById('currentTemp').textContent = `Temperature: ${dataCurrent.main.temp}°F`;
    document.getElementById('weatherDesc').textContent = `Description: ${dataCurrent.weather[0].description}`;
    
    // Add weather icon for current weather
    const iconCode = dataCurrent.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    const weatherIcon = document.getElementById('weatherIcon');
    weatherIcon.src = iconUrl;
    weatherIcon.alt = dataCurrent.weather[0].description; // Set alt text to description

    // Fetch 3-day weather forecast
    const responseForecast = await fetch(apiUrlForecast);
    const dataForecast = await responseForecast.json();
    const forecastContainer = document.getElementById('forecastData');
    forecastContainer.innerHTML = ''; // Clear previous forecast data

    // Filter the data to show only the forecast at noon for the next 3 days
    const forecastList = dataForecast.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 3);

    forecastList.forEach(forecast => {
      const date = new Date(forecast.dt_txt);
      const temp = forecast.main.temp;
      const description = forecast.weather[0].description;
      const iconCode = forecast.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

      // Create forecast list item with weather icon
      const listItem = document.createElement('li');
      listItem.innerHTML = `<strong>${date.toDateString()}</strong>: ${temp}°F, ${description} <img src="${iconUrl}" alt="Weather icon">`;
      forecastContainer.appendChild(listItem);
    });
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
};

// Execute weather fetch on DOM load
document.addEventListener('DOMContentLoaded', fetchWeatherData);
