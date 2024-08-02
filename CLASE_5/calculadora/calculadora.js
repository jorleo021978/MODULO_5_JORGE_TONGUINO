const args = process.argv.slice(2);

if (args.length !== 3) {
    console.error('Uso: node calculadora.js [número1] [operación] [número2]');
    process.exit(1);
}

const [num1, operation, num2] = args;

// Convertir los argumentos numéricos a números reales
const number1 = parseFloat(num1);
const number2 = parseFloat(num2);

// Validar que los argumentos sean números válidos
if (isNaN(number1) || isNaN(number2)) {
    console.error('Por favor, ingrese números válidos.');
    process.exit(1);
}

const operations = {
    '+': (a, b) => a + b,
    's': (a, b) => a + b, // suma
    '-': (a, b) => a - b,
    'r': (a, b) => a - b, // resta
    '*': (a, b) => a * b, // multiplicación
    'm': (a, b) => a * b, // multiplicación
    '/': (a, b) => {
        if (b === 0) {
            console.error('Error: División por cero.');
            process.exit(1);
        }
        return a / b;
    }, // división
    'd': (a, b) => {
        if (b === 0) {
            console.error('Error: División por cero.');
            process.exit(1);
        }
        return a / b;
    } // división
};
// Validar que la operación sea válida
if (!operations[operation]) {
    console.error('Operación no válida. Las operaciones válidas son: +, s (suma), -, r (resta), *, m (multiplicación), /, d (división)');
    process.exit(1);
}

// Realizar la operación y mostrar el resultado
const result = operations[operation](number1, number2);
console.log(`Resultado: ${result}`);

