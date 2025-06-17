document.addEventListener('DOMContentLoaded', () => {
    // Get form elements
    const form = document.getElementById('pokemon-form');
    const numCardsInput = document.getElementById('num-cards');
    const categorySelect = document.getElementById('category');
    const submitBtn = document.getElementById('submit-btn');
    const pokemonCardsContainer = document.getElementById('pokemon-cards');

    // Check if elements exist
    if (!form || !numCardsInput || !categorySelect || !submitBtn || !pokemonCardsContainer) {
        alert("Required elements not found. Check your HTML IDs.");
        console.error('Required elements not found. Check your HTML IDs.');
        return;
    }

    // API endpoint base URL
    const apiBaseUrl = 'https://pokeapi.co/api/v2/pokemon/';

    // Category to type mapping
    const categoryToType = {
        'all': '',
        'normal': 'normal',
        'fire': 'fire',
        'water': 'water',
        'grass': 'grass'
    };

    // Handle form submission 
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const pokemonNumber = parseInt(numCardsInput.value);
        const selectCategory = categorySelect.value;
        const targetType = categoryToType[selectCategory];

        try {
            const response = await fetch(`${apiBaseUrl}${pokemonNumber}`);
            const pokemonData = await response.json();
            
            // Check if type matches (if a specific type is selected)
            if (targetType && !pokemonData.types.some(t => t.type.name === targetType)) {
                pokemonCardsContainer.innerHTML = '<p>No Pokemon of selected type found with this number.</p>';
                return;
            }

            // Clear previous cards and render the new one
            pokemonCardsContainer.innerHTML = '';
            renderPokemonCard(pokemonData);
        } catch (error) {
            console.error(`Error fetching Pokémon #${pokemonNumber}:`, error);
            pokemonCardsContainer.innerHTML = '<p>Pokemon not found. Try a different number.</p>';
        }
    });

    // Render a single Pokémon card
    function renderPokemonCard(pokemonData) {
        const cardHTML = `
        <div class="pokemon-card">
            <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
            <h2>#${pokemonData.id} ${pokemonData.name}</h2>
            <p>Type: ${pokemonData.types.map(t => t.type.name).join(', ')}</p>
        </div>
        `;

        pokemonCardsContainer.insertAdjacentHTML('beforeend', cardHTML);
    }

    // Input validation
    numCardsInput.addEventListener('input', () => {
        const number = parseInt(numCardsInput.value);
        // Pokemon API has around 1000 Pokemon
        if (number < 1 || number > 1000) {
            submitBtn.disabled = true;
        } else {
            submitBtn.disabled = false;
        }
    });
});