# Calculadora basica en node.js

## const args = process.argv.slice(2);
Obtiene los argumentos de la línea de comandos, excluyendo los dos primeros (que son 'node' y el nombre del script).

## if (args.length !== 3) { ... }
Verifica que se han recibido exactamente tres argumentos; de lo contrario, muestra un mensaje de error y finaliza el programa.

## const [num1, operation, num2] = args;
Desestructura los tres argumentos en variables separadas: num1, operation y num2.

## const number1 = parseFloat(num1);
Convierte el primer argumento numérico en un número real.

## const number2 = parseFloat(num2);
Convierte el tercer argumento numérico en un número real.

## if (isNaN(number1) || isNaN(number2)) { ... }
Verifica que los argumentos numéricos sean válidos; de lo contrario, muestra un mensaje de error y finaliza el programa.

## const operations = { ... };
Define un objeto que mapea las operaciones a sus funciones correspondientes.

## '/': (a, b) => { if (b === 0) { ... } return a / b; },
Verifica que el divisor no sea cero; de lo contrario, muestra un mensaje de error y finaliza el programa. Realiza la división si el divisor no es cero.

## if (!operations [operation] ) { ... }
Verifica que la operación proporcionada sea válida; de lo contrario, muestra un mensaje de error y finaliza el programa.

## const result = operations[operation](number1, number2);
Realiza la operación utilizando los números y la operación proporcionados.

## console.log(Resultado: ${result});
Muestra el resultado de la operación en la consola.

## nota final:
Este programa se ejecunta powershell