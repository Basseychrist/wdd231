document.addEventListener('DOMContentLoaded', async () => {
    const query = new URLSearchParams(window.location.search).get('query');
    document.getElementById('query-term').textContent = query;

    const countries = await fetchCountries();
    const filteredCountries = countries.filter(country => 
        country.name.toLowerCase().includes(query.toLowerCase())
    );

    displayResults(filteredCountries);
});

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

function displayResults(countries) {
    const resultsContainer = document.getElementById('country-results');
    resultsContainer.innerHTML = countries.map(country => `
        <div class="country-card">
            <h3>${country.name}</h3>
            <p>Population: ${country.population.toLocaleString()}</p>
            <p>Culture: ${country.culture}</p>
            <p>Landscape: ${country.landscape}</p>
        </div>
    `).join('');
}
