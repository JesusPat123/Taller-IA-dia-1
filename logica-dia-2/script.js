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
console.log(persona.habilidades[2]);

//3. array de objetos
//Crea una lista de tres alumnos (objetos) con nombre y calificación
var alumnos = [
  { nombre: "Ana", calificacion: 85 },
  { nombre: "Luis", calificacion: 92 },
  { nombre: "Marta", calificacion: 78 },
];