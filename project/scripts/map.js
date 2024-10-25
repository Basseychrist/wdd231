// Top 2 countries by population
const countries = [
    { 
        name: "China", 
        population: "1.4 Billion", 
        flag: "https://flagcdn.com/w320/cn.png", 
        location: { lat: 35.8617, lng: 104.1954 },
        point:"lat: 35.8617, long: 104.1954"
    },

    { 
        name: "India", 
        population: "1.4 Billion", 
        flag: "https://flagcdn.com/w320/in.png", 
        location: { lat: 20.5937, lng: 78.9629 },
        point:"lat: 20.5937, long: 78.9629"
    }
];

// Dynamically load the Google Maps script with the API key and callback
function loadGoogleMapsAPI() {
    const script = document.createElement('script');
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDs6hc-05FPAz-aDULK5sMqM2dOpKgkWvQ&callback=initMap";
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
}

// Initialize the map and markers
function initMap() {
    const worldCenter = { lat: 20.0, lng: 0.0 };
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 2,
        center: worldCenter
    });

    // Add markers and info windows for each country
    countries.forEach(country => {
        const marker = new google.maps.Marker({
            position: country.location,
            map: map,
            title: country.name
        });

        const infoWindow = new google.maps.InfoWindow({
            content: `<h3>${country.name}</h3><p>Population: ${country.population}</p>`
        });

        marker.addListener('click', () => {
            infoWindow.open(map, marker);
        });
    });

    // Populate the country sections below the map
    populateCountrySections();
}

// Populate the sections with country information
function populateCountrySections() {
    countries.forEach((country, index) => {
        const countryDiv = document.getElementById(`country-${index + 1}`);
        countryDiv.innerHTML = `
            <img src="${country.flag}" alt="Flag of ${country.name}">
            <h3>${country.name}</h3>
            <p>Population: ${country.population}</p>
            <p>location: ${country.point}</p>

        `;
    });
}

// Load the Google Maps API on window load
window.onload = loadGoogleMapsAPI;