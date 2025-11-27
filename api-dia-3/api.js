// PokéDex - Buscador de Pokémon
// Función mejorada para obtener datos del Pokémon desde PokeAPI

function obtenerPokemonApi(nombrePokemon) {
    const nombreLower = nombrePokemon.toLowerCase().trim();
    const contenedor = document.getElementById('pokemon-card');
    const cargando = document.getElementById('loading');

    if (!nombreLower) {
        contenedor.innerHTML = '<p class="error">Por favor, ingresa un nombre de Pokémon</p>';
        return;
    }

    cargando.style.display = 'block';
    contenedor.innerHTML = '';

    fetch(`https://pokeapi.co/api/v2/pokemon/${nombreLower}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Pokémon no encontrado');
            }
            return response.json();
        })
        .then(data => {
            mostrarPokemon(data);
            cargando.style.display = 'none';
        })
        .catch(error => {
            cargando.style.display = 'none';
            contenedor.innerHTML = `<p class="error">❌ ${error.message}. Verifica el nombre e intenta de nuevo.</p>`;
            console.error('Error:', error);
        });
}

function mostrarPokemon(data) {
    const contenedor = document.getElementById('pokemon-card');
    
    // Obtener información del Pokémon
    const nombre = data.name.charAt(0).toUpperCase() + data.name.slice(1);
    const id = data.id;
    const imagen = data.sprites.other['official-artwork'].front_default || data.sprites.front_default;
    const tipos = data.types.map(type => type.type.name).join(', ');
    const altura = (data.height / 10).toFixed(1);
    const peso = (data.weight / 10).toFixed(1);
    const experiencia = data.base_experience;
    
    // Obtener estadísticas
    const stats = data.stats.reduce((acc, stat) => {
        acc[stat.stat.name] = stat.base_stat;
        return acc;
    }, {});

    const html = `
        <div class="card">
            <div class="card-header" style="background: linear-gradient(135deg, ${getColorByType(data.types[0].type.name)}, ${getColorByType(data.types[0].type.name)}dd)">
                <div class="pokemon-id">#${String(id).padStart(3, '0')}</div>
            </div>
            <div class="card-body">
                <div class="pokemon-image">
                    <img src="${imagen}" alt="${nombre}" onerror="this.src='https://via.placeholder.com/300?text=No+Image'">
                </div>
                <h1 class="pokemon-name">${nombre}</h1>
                
                <div class="types-container">
                    ${data.types.map(type => `<span class="type ${type.type.name}">${type.type.name.toUpperCase()}</span>`).join('')}
                </div>

                <div class="info-grid">
                    <div class="info-item">
                        <span class="label">Altura</span>
                        <span class="value">${altura} m</span>
                    </div>
                    <div class="info-item">
                        <span class="label">Peso</span>
                        <span class="value">${peso} kg</span>
                    </div>
                    <div class="info-item">
                        <span class="label">Experiencia Base</span>
                        <span class="value">${experiencia}</span>
                    </div>
                </div>

                <div class="stats-section">
                    <h3>Estadísticas</h3>
                    <div class="stats-grid">
                        ${Object.entries(stats).map(([stat, value]) => `
                            <div class="stat-item">
                                <div class="stat-label">${stat.replace('-', ' ').toUpperCase()}</div>
                                <div class="stat-bar">
                                    <div class="stat-fill" style="width: ${(value / 150) * 100}%; background: ${getStatColor(value)}"></div>
                                </div>
                                <div class="stat-value">${value}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;

    contenedor.innerHTML = html;
}

function getColorByType(type) {
    const colors = {
        'normal': '#A8A878',
        'fire': '#F08030',
        'water': '#6890F0',
        'electric': '#F8D030',
        'grass': '#78C850',
        'ice': '#98D8D8',
        'fighting': '#C03028',
        'poison': '#A040A0',
        'ground': '#E0C068',
        'flying': '#A890F0',
        'psychic': '#F85888',
        'bug': '#A8B820',
        'rock': '#B8A038',
        'ghost': '#705898',
        'dragon': '#7038F8',
        'dark': '#705848',
        'steel': '#B8B8D0',
        'fairy': '#EE99AC'
    };
    return colors[type] || '#ABABAB';
}

function getStatColor(value) {
    if (value <= 50) return '#FF6B6B';
    if (value <= 75) return '#FFA500';
    if (value <= 100) return '#FFD700';
    if (value <= 125) return '#90EE90';
    return '#00C000';
}

// Manejar búsqueda con Enter
document.addEventListener('DOMContentLoaded', function() {
    const inputBusqueda = document.getElementById('search-input');
    const botonBuscar = document.getElementById('search-btn');

    if (inputBusqueda && botonBuscar) {
        botonBuscar.addEventListener('click', function() {
            obtenerPokemonApi(inputBusqueda.value);
        });

        inputBusqueda.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                obtenerPokemonApi(inputBusqueda.value);
            }
        });
    }
});