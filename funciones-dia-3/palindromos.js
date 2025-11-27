//  Ejercicio: detector de palíndromos
//  Objetivo: crea una logica compleja encapsulada en una funcion
//  Un ejemplo de palindromos es "anilina" o "reconocer", oso
//1.- crea una funcion llamada esPalindromo que reciba un texto y reotne true si espalindromo y false si no lo es
function esPalindromo(texto) {
    // Elimina espacios y caracteres especiales, convierte a minúsculas
    const textoLimpio = texto.replace(/[^a-záéíóúñ0-9]/gi, '').toLowerCase();
    const longitud = textoLimpio.length;    
    for (let i = 0; i < longitud / 2; i++) {
        if (textoLimpio[i] !== textoLimpio[longitud - 1 - i]) {
            return false; // No es un palíndromo
        }
    }
    return true; // Es un palíndromo
}
