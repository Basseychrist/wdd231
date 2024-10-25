document.addEventListener('DOMContentLoaded', async () => {
    const countryInfo = document.getElementById('country-info');
    const searchInput = document.getElementById('search');

    // Fetch and display countries data
    let countries = await fetchCountries();
    displayCountries(countries);

    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', () => filterCountries(button.dataset.filter, countries));
    });

    // Search input
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        displayCountries(countries.filter(country =>
            country.name.toLowerCase().includes(query)
        ));
    });

    // Toggle View
    document.getElementById('list-view').addEventListener('click', () => displayCountries(countries, 'list'));
    document.getElementById('grid-view').addEventListener('click', () => displayCountries(countries, 'grid'));
});

// Async function to fetch country data
async function fetchCountries() {
    try {
        const response = await fetch('data/countries.json');
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        return data.countries;
    } catch (error) {
        console.error(error);
        return [];
    }
}

function displayCountries(countries, view = 'grid') {
    const countryInfo = document.getElementById('country-info');
    countryInfo.innerHTML = countries.map(country => `
        <div class="country-card ${view}">
            <h3>${country.name}</h3>
            <p>Population: ${country.population.toLocaleString()}</p>
            <p>Culture: ${country.culture}</p>
            <p>Landscape: ${country.landscape}</p>
        </div>
    `).join('');
}

function filterCountries(criteria, countries) {
    let sortedCountries;
    if (criteria === 'population') {
        sortedCountries = [...countries].sort((a, b) => b.population - a.population);
    } else if (criteria === 'name') {
        sortedCountries = [...countries].sort((a, b) => a.name.localeCompare(b.name));
    } else if (criteria === 'culture') {
        sortedCountries = [...countries].sort((a, b) => a.culture.localeCompare(b.culture));
    }
    displayCountries(sortedCountries);
}
