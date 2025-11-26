//Ejercicio: Arrays y Objetos
//1. array(listas)
//Crea una lista de tus tres comidas favoritas
var comidasFavoritas = ["Pizza", "Sushi", "Tacos"];

//2. objetos (kay y vaule)
//Crea un objeto que represente a una persona con las propiedades: nombre, edad y ciudad
var persona = {
  nombre: "Nombre: Juan",
  edad: 30,
  ciudad: "Madrid",
  habilidades: ["Programación", "dibujo", "cocina"],
  estatura: 1.75,
  programador: true,
};

//como accedo a la propiedad de nombre del objeto persona
console.log(persona.nombre);

//como accedo a la propiedad habilidades del objeto persona
console.log(persona.habilidades);

//como accedo a la habilidad del dibujo del objeto persona

console.log(persona.habilidades[1]);

//3. array de objetos
//Crea una lista de tres alumnos (objetos) con nombre y calificación
var alumnos = [
  { nombre: "Ana", calificacion: 85 },
  { nombre: "Luis", calificacion: 92 },
  { nombre: "Marta", calificacion: 78 },
];

//Escribe un bucle que recorra el array de los alumnos e imprima solo los que tengan una calificacion mayor a 80
for (var i = 0; i < alumnos.length; i++) {
  if (alumnos[i].calificacion > 80) {
    console.log("Alumno aprobado: " + alumnos[i].nombre + " con calificación " + alumnos[i].calificacion);
  }
}