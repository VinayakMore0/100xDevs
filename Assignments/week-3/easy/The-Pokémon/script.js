// Get form elements
const form = document.getElementById('pokemon-form');
const numCardsInput =   document.getElementById('num-cards');
const categorySelect = document.getElementById('category');
const submitBtn = document.getElementById('submit-btn');
const pokemonCardsContainer = document.getElementById('pokemon-cards');

// API endpoint base URL
const apiBaseUrl = 'https://pokeapi.co/api/v2/pokemon/';

// Category to type mapping (add more as needed)
const categoryToType = {
    'all': '',
    'normal': 'normal',
    'fire': 'fire',
    'water': 'water',
    'grass': 'grass'
};

// Handle form submission 
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const numCards = parseInt(numCardsInput.value);
    const selectCategory = categorySelect.value;
    const targetType = categoryToType[selectCategory];

    // Fetch and render Pokémon
    fetchPokemonCards(numCards, targetType);
});

// Fetch Pokémon cards from API and render them
async function fetchPokemonCards(numCards, type) {
    pokemonCardsContainer.innerHTML = ''; // Clear previous cards

    for(let i = 1; i <= numCards; i++) {
        try {
            const response = await fetch(`${apiBaseUrl}${i}`);
            const pokemonData = await response.json();
            // Filter by type (if selected)
            if (type && !pokemonData.types.some((t) => t.type.name === type)) {
                continue; // Skip if type does't match
            }

            // Render Pokémon card

            renderPokemonCard(pokemonData);
        } catch (error) {
            console.error(`Error fetching Pokémon #${i}:`, error);
        }
    }
}

// Render a single Pokémon card
function renderPokemonCard(pokemonData) {
    const cardHTML = `
    <div class="pokemon-card">
        <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
        <h2>${pokemonData.name}</h2>
        <p>Type: ${pokemonData.types.map((t) => t.type.name).join(', ')}</p>
    </div>
    `;

    pokemonCardsContainer.insertAdjacentElement('beforeend', cardHTML);
}

// Handle errors and edge cases
function fetchPokemonCards(numCards, type) {
    // ...
}

// input validation
// numCardsInput.addEventListener('input', () => {
//     const numCards = parseInt(numCardsInput.value);
//     if (numCards < 1 || numCards > 100) {
//         submitBtn.disabled = true;
//     } else {
//         submitBtn.disabled = false;
//     }
// });

