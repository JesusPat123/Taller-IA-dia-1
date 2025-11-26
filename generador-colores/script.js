/**
 * Generador de Colores Aleatorios
 * Esta aplicación genera colores aleatorios en formato hexadecimal (#RRGGBB)
 * y permite copiar el código al portapapeles
 */

// ==========================================
// REFERENCIAS A ELEMENTOS DEL DOM
// ==========================================

const colorDisplay = document.getElementById('colorDisplay');
const codigoHexadecimal = document.getElementById('codigoHexadecimal');
const btnGenerar = document.getElementById('btnGenerar');
const btnCopiar = document.getElementById('btnCopiar');
const mensajeConfirmacion = document.getElementById('mensajeConfirmacion');

// ==========================================
// FUNCIÓN: Generar Color Hexadecimal Aleatorio
// ==========================================

/**
 * Genera un color aleatorio en formato hexadecimal (#RRGGBB)
 * 
 * @returns {string} Código hexadecimal del color generado (ej: #A1B2C3)
 * 
 * Explicación:
 * - Math.random() genera un número entre 0 y 1
 * - Multiplicamos por 0xFFFFFF (16777215) para obtener un número entre 0 y 16777215
 * - Math.floor() redondea hacia abajo al número entero más cercano
 * - .toString(16) convierte el número a formato hexadecimal
 * - .padStart(6, '0') agrega ceros a la izquierda si es necesario (ej: si es 'ABC', lo convierte en '000ABC')
 * - Finalmente agregamos '#' al inicio
 */
function generarColorAleatorio() {
    // Generar un número aleatorio entre 0 y 16777215 (0xFFFFFF)
    const numeroAleatorio = Math.floor(Math.random() * 0xFFFFFF);
    
    // Convertir el número a hexadecimal y agregar ceros a la izquierda si es necesario
    const colorHex = '#' + numeroAleatorio.toString(16).padStart(6, '0').toUpperCase();
    
    return colorHex;
}

// ==========================================
// FUNCIÓN: Actualizar Color
// ==========================================

/**
 * Actualiza el color del display y el texto del código hexadecimal
 * 
 * @param {string} color - Código hexadecimal del color (ej: #A1B2C3)
 * 
 * Explicación:
 * - Cambia el background-color del div con transición suave
 * - Actualiza el contenido del párrafo con el nuevo código
 * - Oculta el mensaje de confirmación de copia
 */
function actualizarColor(color) {
    // Cambiar el color de fondo del div
    colorDisplay.style.backgroundColor = color;
    
    // Actualizar el código hexadecimal mostrado
    codigoHexadecimal.textContent = color;
    
    // Ocultar el mensaje de confirmación si estaba visible
    ocultarMensajeConfirmacion();
}

// ==========================================
// FUNCIÓN: Copiar al Portapapeles
// ==========================================

/**
 * Copia el código hexadecimal del color al portapapeles
 * 
 * Explicación:
 * - Utiliza la API Clipboard (navigator.clipboard.writeText)
 * - Si la copia es exitosa, muestra un mensaje de confirmación visual
 * - Si falla, utiliza el método alternativo (seleccionar y ejecutar comando copy)
 * - El mensaje desaparece después de 2 segundos
 */
function copiarAlPortapapeles() {
    const codigoColor = codigoHexadecimal.textContent;
    
    // Intenta usar la API moderna del portapapeles
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(codigoColor)
            .then(() => {
                mostrarMensajeConfirmacion();
            })
            .catch(() => {
                // Si falla, usar el método alternativo
                metodoAlternativoCopia(codigoColor);
            });
    } else {
        // Para navegadores más antiguos, usar método alternativo
        metodoAlternativoCopia(codigoColor);
    }
}

// ==========================================
// FUNCIÓN: Método Alternativo de Copia
// ==========================================

/**
 * Copia el texto al portapapeles usando un método alternativo
 * (para navegadores que no soportan la API Clipboard moderna)
 * 
 * @param {string} texto - Texto a copiar
 * 
 * Explicación:
 * - Crea un elemento textarea temporal
 * - Coloca el texto en el textarea
 * - Lo añade al DOM
 * - Selecciona todo el contenido
 * - Ejecuta el comando 'copy'
 * - Elimina el elemento temporal
 */
function metodoAlternativoCopia(texto) {
    // Crear un textarea temporal (no visible)
    const textarea = document.createElement('textarea');
    textarea.value = texto;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    
    // Agregar al DOM
    document.body.appendChild(textarea);
    
    // Seleccionar el contenido
    textarea.select();
    
    try {
        // Ejecutar el comando copy
        document.execCommand('copy');
        mostrarMensajeConfirmacion();
    } catch (err) {
        console.error('Error al copiar:', err);
    }
    
    // Remover el elemento temporal
    document.body.removeChild(textarea);
}

// ==========================================
// FUNCIÓN: Mostrar Mensaje de Confirmación
// ==========================================

/**
 * Muestra un mensaje de confirmación indicando que el código fue copiado
 * El mensaje desaparece después de 2 segundos
 */
function mostrarMensajeConfirmacion() {
    // Agregar la clase 'visible' para mostrar el mensaje con transición
    mensajeConfirmacion.classList.add('visible');
    
    // Programar la ocultación del mensaje después de 2 segundos
    setTimeout(ocultarMensajeConfirmacion, 2000);
}

// ==========================================
// FUNCIÓN: Ocultar Mensaje de Confirmación
// ==========================================

/**
 * Oculta el mensaje de confirmación con transición suave
 */
function ocultarMensajeConfirmacion() {
    mensajeConfirmacion.classList.remove('visible');
}

// ==========================================
// EVENT LISTENERS (Manejadores de Eventos)
// ==========================================

/**
 * Evento click en el botón "Generar Color"
 * - Genera un color aleatorio
 * - Actualiza el display con el nuevo color
 */
btnGenerar.addEventListener('click', () => {
    const nuevoColor = generarColorAleatorio();
    actualizarColor(nuevoColor);
});

/**
 * Evento click en el botón "Copiar Código"
 * - Copia el código hexadecimal actual al portapapeles
 * - Muestra una confirmación visual
 */
btnCopiar.addEventListener('click', copiarAlPortapapeles);

/**
 * Evento click en el div del color (opcional)
 * - Permite generar un nuevo color haciendo clic directamente en el div
 */
colorDisplay.addEventListener('click', () => {
    const nuevoColor = generarColorAleatorio();
    actualizarColor(nuevoColor);
});

/**
 * Evento de carga de la página
 * - Genera un color inicial al abrir la página
 */
document.addEventListener('DOMContentLoaded', () => {
    const colorInicial = generarColorAleatorio();
    actualizarColor(colorInicial);
});

/**
 * Atajos de teclado (opcional)
 * - Presiona ESPACIO para generar un nuevo color
 * - Presiona CTRL+C (o CMD+C) para copiar el código
 */
document.addEventListener('keydown', (evento) => {
    // Generar color con la barra espaciadora
    if (evento.code === 'Space' && evento.target === document.body) {
        evento.preventDefault();
        const nuevoColor = generarColorAleatorio();
        actualizarColor(nuevoColor);
    }
});
