const API_URL = 'https://rickandmortyapi.com/api/character';
const container = document.getElementById('container');
const searchInput = document.getElementById('searchinput');
const searchBtn = document.getElementById('searchBtn');

let allCharacters = [];

/**
 * Obtiene todos los personajes de la API
 */
async function fetchAllCharacters() {
    try {
        container.innerHTML = '<div class="loading">Cargando personajes...</div>';
        
        let allData = [];
        let nextUrl = API_URL;
        let pageCount = 0;
        const maxPages = 43; // Rick and Morty tiene aproximadamente 43 páginas

        // Cargar todas las páginas
        while (nextUrl && pageCount < maxPages) {
            const response = await fetch(nextUrl);
            
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            
            const data = await response.json();
            allData = allData.concat(data.results);
            nextUrl = data.info.next;
            pageCount++;
        }

        allCharacters = allData;
        displayCharacters(allCharacters);
    } catch (error) {
        showError('Error al cargar los personajes. Intenta más tarde.');
        console.error('Error:', error);
    }
}

/**
 * Busca personajes por nombre
 */
async function searchCharacters(name) {
    if (!name.trim()) {
        displayCharacters(allCharacters);
        return;
    }

    try {
        container.innerHTML = '<div class="loading">Buscando personajes...</div>';
        
        const response = await fetch(`${API_URL}?name=${encodeURIComponent(name)}`);
        
        if (!response.ok) {
            if (response.status === 404) {
                showNoResults(`No encontramos personajes con el nombre "${name}"`);
                return;
            }
            throw new Error(`Error: ${response.status}`);
        }
        
        const data = await response.json();
        displayCharacters(data.results);
    } catch (error) {
        showError('Error en la búsqueda. Intenta con otro nombre.');
        console.error('Error:', error);
    }
}

/**
 * Muestra los personajes en el contenedor
 */
function displayCharacters(characters) {
    if (!characters || characters.length === 0) {
        showNoResults('No hay personajes para mostrar');
        return;
    }

    container.innerHTML = '';
    
    characters.forEach(character => {
        const card = createCharacterCard(character);
        container.appendChild(card);
    });
}

/**
 * Crea una tarjeta de personaje
 */
function createCharacterCard(character) {
    const card = document.createElement('div');
    card.className = 'card';
    
    const statusClass = character.status.toLowerCase() === 'alive' ? 'alive' : 'dead';
    const statusText = character.status === 'Alive' ? 'Vivo' : character.status === 'Dead' ? 'Muerto' : 'Desconocido';
    
    card.innerHTML = `
        <img src="${character.image}" alt="${character.name}">
        <div class="card-content">
            <div class="card-title">${character.name}</div>
            <div class="card-info">
                <span class="status ${statusClass}">${statusText}</span>
            </div>
            <div class="card-info">
                <span class="info-label">Especie:</span>
                <span class="info-value">${character.species}</span>
            </div>
            <div class="card-info">
                <span class="info-label">Ubicación:</span>
                <span class="info-value">${character.location.name}</span>
            </div>
        </div>
    `;
    
    return card;
}

/**
 * Muestra un mensaje de error
 */
function showError(message) {
    container.innerHTML = `<div class="error">${message}</div>`;
}

/**
 * Muestra un mensaje cuando no hay resultados
 */
function showNoResults(message) {
    container.innerHTML = `<div class="no-results">${message}</div>`;
}

/**
 * Event Listeners
 */
searchBtn.addEventListener('click', () => {
    const searchTerm = searchInput.value;
    searchCharacters(searchTerm);
});

searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const searchTerm = searchInput.value;
        searchCharacters(searchTerm);
    }
});

// Cargar todos los personajes al iniciar
document.addEventListener('DOMContentLoaded', fetchAllCharacters);
