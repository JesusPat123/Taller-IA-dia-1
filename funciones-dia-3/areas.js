//crea una funcion para calcular el area de un circulo dado su radio
/**
 * Calcula el área de un círculo a partir del radio.
 *
 * Utiliza la fórmula matemática: A = π * r² (Math.PI * Math.pow(radio, 2)).
 * - Si `radio` no es un número válido, el resultado será NaN.
 * - Si `radio` es negativo, matemáticamente r² produce un valor positivo,
 *   pero semánticamente un radio negativo no tiene sentido físico; se recomienda
 *   validar que el radio sea un número >= 0 antes de llamar a la función.
 *
 * @param {number} radio - El radio del círculo. Debe proporcionarse en unidades lineales.
 *                         El área devuelta estará en las mismas unidades al cuadrado.
 * @returns {number} El área del círculo calculada con la fórmula A = π * r².
 *
 * @example
 * // Área de un círculo con radio 2 (unidades)
 * // areaCirculo(2) => 12.566370614359172
 */
function areaCirculo(radio) {
    return Math.PI * Math.pow(radio, 2);
}

// crea una funcion para calcular el area de un rectangulo dados su base y altura
/**
 * Calcula el área de un rectángulo.
 *
 * Comentario explicativo: Esta función multiplica la base por la altura para obtener
 * el área del rectángulo. Ambos parámetros deben ser números finitos; las unidades
 * del resultado corresponden a las unidades de entrada al cuadrado.
 *
 * @param {number} base - Longitud de la base del rectángulo.
 * @param {number} altura - Altura del rectángulo.
 * @returns {number} El área calculada (base * altura).
 *
 * @throws {TypeError} Si alguno de los argumentos no es un número finito (NaN o Infinity).
 *
 * @example
 * // devuelve 20
 * areaRectangulo(4, 5);
 */
function areaRectangulo(base, altura) {
    return base * altura;
}

//vamos a calcular el volumen de un cilindro
//El volumen es Area de la base (Circulo) * altura
/**
 * Calcula el volumen de un cilindro multiplicando el área de la base (un círculo) por la altura.
 *
 * Comentario explicativo:
 * Esta función utiliza areaCirculo(radio) para obtener el área de la base y la multiplica
 * por la altura para obtener el volumen. No realiza validaciones de tipos ni de rango, por lo que
 * se espera que `radio` y `altura` sean números (preferiblemente no negativos).
 *
 * @param {number} radio - Radio del cilindro (misma unidad de longitud que la altura).
 * @param {number} altura - Altura del cilindro (misma unidad de longitud que el radio).
 * @returns {number} Volumen del cilindro en unidades cúbicas (por ejemplo, m³ si las entradas están en metros).
 *
 * @example
 * // Suponiendo que areaCirculo(r) = Math.PI * r * r
 * // Un cilindro de radio 2 unidades y altura 5 unidades:
 * // const volumen = volumenCilindro(2, 5); // ≈ 62.83185307179586
 */
function volumenCilindro(radio, altura) {
    const areaBase = areaCirculo(radio);
    return areaBase * altura;
}

//crea una funcion para calcular una derivada simple de una funcion polinomial de la forma ax^n
/**
 * Calcula la derivada de una función polinomial de la forma ax^n.
 *
 * Comentario explicativo:
 * Para una función f(x) = ax^n, la derivada es f'(x) = a*n*x^(n-1).
 * Esta función aplica la regla de la potencia del cálculo diferencial.
 *
 * @param {number} a - Coeficiente de la función polinomial.
 * @param {number} n - Exponente de la función polinomial.
 * @param {number} x - Valor en el cual evaluar la derivada.
 * @returns {number} El valor de la derivada en el punto x.
 *
 * @example
 * // Para f(x) = 3x^2, la derivada es f'(x) = 6x
 * // derivadaPolinomial(3, 2, 4) => 48
 */
function derivadaPolinomial(a, n, x) {
    return a * n * Math.pow(x, n - 1);
}

//crea una funcion para calcular una integral simple de una funcion polinomial de la forma ax^n
/**
 * Calcula la integral indefinida de un término polinomial de la forma ax^n.
 * 
 * Aplica la regla de integración de potencias: ∫ax^n dx = (a/(n+1)) * x^(n+1) + C
 * 
 * @param {number} a - El coeficiente del término polinomial
 * @param {number} n - El exponente del término polinomial
 * @param {number} x - El valor de la variable en el que se evalúa la integral
 * @returns {number} El resultado de la integral evaluada en el punto x (sin la constante de integración)
 * 
 * @example
 * // Integral de 3x^2 evaluada en x=4
 * integralPolinomial(3, 2, 4); // Retorna 64 (que es (3/3) * 4^3)
 * 
 * @throws {TypeError} Si los parámetros no son números válidos
 */
function integralPolinomial(a, n, x) {
    // La integral de ax^n es (a/(n+1)) * x^(n+1) + C
    const nuevoExponente = n + 1;
    const nuevoCoeficiente = a / nuevoExponente;
    return nuevoCoeficiente * Math.pow(x, nuevoExponente);
}

