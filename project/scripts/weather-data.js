// Async function to fetch and display country data
async function fetchAndDisplayCountries() {
  try {
    const response = await fetch('data/weather-data.json'); // Fetch the JSON file
    const data = await response.json(); // Parse the JSON data

    const countryList = document.getElementById('country-list');
    data.forEach(country => {
      const countryCard = document.createElement('div');
      countryCard.className = 'country-card';
      countryCard.innerHTML = `
        <img src="${country.image}" alt="${country.country}" loading="lazy">
        <h2>${country.country}</h2>
        <p>Weather: ${country.weather}</p>
        <button onclick='viewMore(${JSON.stringify(country)})'>View More</button>
      `;
      countryList.appendChild(countryCard);
    });
  } catch (error) {
    console.error('Error fetching country data:', error);
  }
}

// Show modal with more details
function viewMore(country) {
  document.getElementById('modal-country').textContent = country.country;
  document.getElementById('modal-weather').textContent = `Weather: ${country.weather}`;
  document.getElementById('modal-temperature').textContent = `Temperature: ${country.temperature}`;
  document.getElementById('modal-humidity').textContent = `Humidity: ${country.humidity}`;
  document.getElementById('modal-wind').textContent = `Wind: ${country.wind}`;
  document.getElementById('modal-description').textContent = country.description;

  const modal = document.getElementById('weather-modal');
  modal.style.display = 'flex';
}

// Close modal
function closeModal() {
  const modal = document.getElementById('weather-modal');
  modal.style.display = 'none';
}

// Close modal when clicking outside the content
window.onclick = function(event) {
  const modal = document.getElementById('weather-modal');
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};

// Call the async function to fetch and display countries when the page loads
fetchAndDisplayCountries();
