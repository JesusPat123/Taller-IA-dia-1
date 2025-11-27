// Dog API - Gestión de datos y funcionalidad

class DogAPI {
    constructor() {
        this.allBreeds = [];
        this.filteredBreeds = [];
        this.breedImages = {};
        this.currentViewerImages = [];
        this.currentImageIndex = 0;
        this.init();
    }

    async init() {
        await this.loadAllBreeds();
        this.setupEventListeners();
    }

    // Obtener todas las razas de la API
    async loadAllBreeds() {
        try {
            const response = await fetch('https://dog.ceo/api/breeds/list/all');
            const data = await response.json();

            if (data.status === 'success') {
                this.allBreeds = this.formatBreeds(data.message);
                this.filteredBreeds = [...this.allBreeds];
                await this.loadBreedImages();
                this.renderCards();
            }
        } catch (error) {
            console.error('Error al cargar razas:', error);
            this.showError('Error al cargar las razas de perros');
        }
    }

    // Formatear razas (combinar raza principal con sub-razas)
    formatBreeds(breedsObj) {
        const formatted = [];
        for (const [breed, subBreeds] of Object.entries(breedsObj)) {
            if (subBreeds.length === 0) {
                formatted.push({
                    id: breed,
                    name: this.capitalizeBreed(breed),
                    mainBreed: breed,
                    subBreed: null
                });
            } else {
                subBreeds.forEach(subBreed => {
                    formatted.push({
                        id: `${breed}-${subBreed}`,
                        name: `${this.capitalizeBreed(subBreed)} ${this.capitalizeBreed(breed)}`,
                        mainBreed: breed,
                        subBreed: subBreed
                    });
                });
            }
        }
        return formatted;
    }

    // Capitalizar nombre de raza
    capitalizeBreed(breed) {
        return breed
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    // Cargar imágenes para cada raza
    async loadBreedImages() {
        for (const breed of this.allBreeds) {
            try {
                const endpoint = breed.subBreed
                    ? `https://dog.ceo/api/breed/${breed.mainBreed}/${breed.subBreed}/images/random/3`
                    : `https://dog.ceo/api/breed/${breed.mainBreed}/images/random/3`;

                const response = await fetch(endpoint);
                const data = await response.json();

                if (data.status === 'success') {
                    this.breedImages[breed.id] = data.message;
                }
            } catch (error) {
                console.error(`Error cargando imagen para ${breed.name}:`, error);
            }
        }
    }

    // Configurar eventos
    setupEventListeners() {
        const searchInput = document.getElementById('searchInput');
        const closeModal = document.getElementById('closeModal');
        const modal = document.getElementById('detailModal');
        const closeImageViewer = document.getElementById('closeImageViewer');
        const imageViewer = document.getElementById('imageViewer');
        const prevImageBtn = document.getElementById('prevImageBtn');
        const nextImageBtn = document.getElementById('nextImageBtn');

        searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
        closeModal.addEventListener('click', () => this.closeModal());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) this.closeModal();
        });

        // Eventos del visor de imágenes
        closeImageViewer.addEventListener('click', () => this.closeImageViewer());
        imageViewer.addEventListener('click', (e) => {
            if (e.target === imageViewer) this.closeImageViewer();
        });
        prevImageBtn.addEventListener('click', () => this.previousImage());
        nextImageBtn.addEventListener('click', () => this.nextImage());

        // Navegación con teclado
        document.addEventListener('keydown', (e) => {
            if (imageViewer.classList.contains('active')) {
                if (e.key === 'ArrowLeft') this.previousImage();
                if (e.key === 'ArrowRight') this.nextImage();
                if (e.key === 'Escape') this.closeImageViewer();
            }
        });
    }

    // Buscar razas
    handleSearch(query) {
        const searchTerm = query.toLowerCase();
        this.filteredBreeds = this.allBreeds.filter(breed =>
            breed.name.toLowerCase().includes(searchTerm)
        );
        this.renderCards();
    }

    // Renderizar tarjetas
    renderCards() {
        const container = document.getElementById('dogsContainer');

        if (this.filteredBreeds.length === 0) {
            container.innerHTML = `
                <div class="no-results" style="grid-column: 1 / -1;">
                    <div class="no-results-emoji">🔍</div>
                    <p>No se encontraron razas de perros con ese nombre</p>
                </div>
            `;
            return;
        }

        container.innerHTML = this.filteredBreeds
            .map(breed => this.createCard(breed))
            .join('');

        // Agregar event listeners a las tarjetas
        document.querySelectorAll('.dog-card').forEach((card, index) => {
            card.addEventListener('click', () => {
                const breedId = card.dataset.breedId;
                const breed = this.allBreeds.find(b => b.id === breedId);
                this.showModal(breed);
            });
        });
    }

    // Crear HTML de tarjeta
    createCard(breed) {
        const images = this.breedImages[breed.id] || [];
        const imageUrl = images.length > 0 ? images[0] : 'https://via.placeholder.com/250';

        return `
            <div class="dog-card" data-breed-id="${breed.id}">
                <img src="${imageUrl}" alt="${breed.name}" class="dog-card-image" onerror="this.src='https://via.placeholder.com/250'">
                <div class="dog-card-info">
                    <h3>${breed.name}</h3>
                    <p>${breed.subBreed ? 'Subtipo: ' + this.capitalizeBreed(breed.subBreed) : 'Raza principal'}</p>
                    <button class="view-btn">Ver detalles</button>
                </div>
            </div>
        `;
    }

    // Mostrar modal con detalles
    async showModal(breed) {
        const modal = document.getElementById('detailModal');
        const images = this.breedImages[breed.id] || [];
        const mainImage = images.length > 0 ? images[0] : 'https://via.placeholder.com/600';

        // Obtener información adicional de la raza
        const breedInfo = await this.getBreedInfo(breed);

        document.getElementById('modalBreedName').textContent = breed.name;
        document.getElementById('modalImage').src = mainImage;
        document.getElementById('modalImage').onerror = function() {
            this.src = 'https://via.placeholder.com/600';
        };

        document.getElementById('modalBody').innerHTML = `
            ${this.createBreedInfoHTML(breed, breedInfo, images)}
        `;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Agregar event listeners a imágenes en la galería
        setTimeout(() => {
            document.querySelectorAll('.gallery-thumbnail').forEach((thumb, idx) => {
                thumb.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.openImageViewer(images, idx);
                });
            });

            // También permitir hacer click en la imagen principal del modal
            const modalImage = document.getElementById('modalImage');
            modalImage.addEventListener('click', (e) => {
                e.stopPropagation();
                this.openImageViewer(images, 0);
            });
        }, 100);
    }

    // Obtener información adicional de la raza
    async getBreedInfo(breed) {
        try {
            const endpoint = breed.subBreed
                ? `https://dog.ceo/api/breed/${breed.mainBreed}/${breed.subBreed}`
                : `https://dog.ceo/api/breed/${breed.mainBreed}`;

            const response = await fetch(endpoint);
            const data = await response.json();

            if (data.status === 'success') {
                return data.message;
            }
        } catch (error) {
            console.error('Error obteniendo info de raza:', error);
        }
        return {};
    }

    // Crear HTML de información de raza
    createBreedInfoHTML(breed, breedInfo, images) {
        let html = `
            <div class="modal-section">
                <h3>Información General</h3>
                <div class="characteristic">
                    <span class="characteristic-label">Raza:</span>
                    <span>${breed.name}</span>
                </div>
                <div class="characteristic">
                    <span class="characteristic-label">Tipo:</span>
                    <span>${breed.subBreed ? 'Subtipo' : 'Raza Principal'}</span>
                </div>
                ${breed.subBreed ? `
                <div class="characteristic">
                    <span class="characteristic-label">Subtipo:</span>
                    <span>${this.capitalizeBreed(breed.subBreed)}</span>
                </div>
                ` : ''}
            </div>

            <div class="modal-section">
                <h3>Galería de Imágenes</h3>
                <p>Se mostraron ${images.length} imágenes de esta raza - Haz click en una imagen para verla en grande</p>
                <div class="image-gallery">
                    ${images.map((img, idx) => `
                        <img src="${img}" alt="Perro ${idx + 1}" class="gallery-thumbnail ${idx === 0 ? 'active' : ''}" data-image-index="${idx}" onerror="this.src='https://via.placeholder.com/150'">
                    `).join('')}
                </div>
            </div>

            <div class="modal-section">
                <h3>Características</h3>
                <p style="color: #999; font-size: 0.9em;">Información adicional sobre la raza ${breed.name}</p>
                <div class="characteristic">
                    <span class="characteristic-label">Origen:</span>
                    <span>Consulta fuentes especializadas caninas</span>
                </div>
                <div class="characteristic">
                    <span class="characteristic-label">Temperamento:</span>
                    <span>Varía según el individuo y la socialización</span>
                </div>
                <div class="characteristic">
                    <span class="characteristic-label">Nivel de energía:</span>
                    <span>Depende de la raza específica</span>
                </div>
                <div class="characteristic">
                    <span class="characteristic-label">Necesidades de cuidado:</span>
                    <span>Consulta con un veterinario profesional</span>
                </div>
            </div>

            <div class="modal-section">
                <h3>Recomendaciones</h3>
                <p>Para información completa y detallada sobre esta raza, te recomendamos consultar con:</p>
                <ul style="margin-left: 20px; color: #666; line-height: 1.8;">
                    <li>Veterinarios profesionales</li>
                    <li>Criadores registrados y certificados</li>
                    <li>Organizaciones de razas caninas</li>
                    <li>Expertos en comportamiento canino</li>
                </ul>
            </div>
        `;
        return html;
    }

    // Cerrar modal
    closeModal() {
        const modal = document.getElementById('detailModal');
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Abrir visor de imágenes
    openImageViewer(images, initialIndex = 0) {
        this.currentViewerImages = images;
        this.currentImageIndex = initialIndex;
        this.updateImageViewer();
        
        const imageViewer = document.getElementById('imageViewer');
        imageViewer.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Cerrar visor de imágenes
    closeImageViewer() {
        const imageViewer = document.getElementById('imageViewer');
        imageViewer.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Actualizar visor de imágenes
    updateImageViewer() {
        const viewerImage = document.getElementById('viewerImage');
        const imageCounter = document.getElementById('imageCounter');
        const prevBtn = document.getElementById('prevImageBtn');
        const nextBtn = document.getElementById('nextImageBtn');

        viewerImage.src = this.currentViewerImages[this.currentImageIndex];
        imageCounter.textContent = `${this.currentImageIndex + 1} / ${this.currentViewerImages.length}`;

        prevBtn.disabled = this.currentImageIndex === 0;
        nextBtn.disabled = this.currentImageIndex === this.currentViewerImages.length - 1;
    }

    // Imagen anterior
    previousImage() {
        if (this.currentImageIndex > 0) {
            this.currentImageIndex--;
            this.updateImageViewer();
        }
    }

    // Imagen siguiente
    nextImage() {
        if (this.currentImageIndex < this.currentViewerImages.length - 1) {
            this.currentImageIndex++;
            this.updateImageViewer();
        }
    }

    // Mostrar error
    showError(message) {
        const container = document.getElementById('dogsContainer');
        container.innerHTML = `
            <div class="no-results" style="grid-column: 1 / -1;">
                <div class="no-results-emoji">⚠️</div>
                <p>${message}</p>
            </div>
        `;
    }
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new DogAPI();
});
