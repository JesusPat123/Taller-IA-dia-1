// Escribe hola mundo en la consola
console.log("Hola Mundo");

//"¿Qué es un commit y por qué es importante?"
// Un commit es una instantánea de los cambios realizados en el código fuente de un proyecto. Es una operación fundamental en sistemas de control de versiones como Git. Cada commit registra el estado del proyecto en un momento específico, incluyendo los cambios realizados, quién los hizo y cuándo se hicieron.

//"¿Cuál es la diferencia entre git add y git commit?"
// git add es el comando que se utiliza para agregar cambios específicos al área de preparación (staging area) antes de hacer un commit. Permite seleccionar qué archivos o partes de archivos se incluirán en el próximo commit.

//"Explícame qué hace el comando git push."
// git push es el comando que se utiliza para subir los commits locales a un repositorio remoto. Esto permite compartir los cambios realizados en el código con otros colaboradores del proyecto y mantener el repositorio remoto actualizado con los últimos cambios.



// Definimos una función llamada 'sumar' que recibirá dos parámetros.
// Usamos la sintaxis clásica function (no ES6 arrow functions).
function sumar(a, b) {
  // Convertimos el primer argumento a número usando Number().
  // Esto ayuda a que la función funcione si pasan cadenas como "2".
  var numeroA = Number(a);

  // Convertimos el segundo argumento a número por la misma razón.
  var numeroB = Number(b);

  // Si alguna conversión falla, Number(...) devuelve NaN (Not-a-Number).
  // Comprobamos si alguno es NaN y avisamos al usuario en ese caso.
  if (isNaN(numeroA) || isNaN(numeroB)) {
    // Lanzamos un error para indicar que los valores no son válidos.
    // En programas más grandes podríamos devolver null o manejarlo de otra forma.
    throw new Error('Ambos argumentos deben ser números o valores convertibles a número.');
  }

  // Sumamos los dos números ya convertidos y devolvemos el resultado.
  return numeroA + numeroB;
}

// Ejemplos de uso:
// console.log(sumar(2, 3));        // Imprime 5
// console.log(sumar('4', '6'));    // Imprime 10 (las cadenas se convierten a números)
// console.log(sumar(2, 'tres'));   // Lanza un error porque 'tres' no es número