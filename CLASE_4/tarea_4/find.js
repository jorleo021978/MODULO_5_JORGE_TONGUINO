import { createReadStream } from 'fs';

const filePath = './numeros.txt';
const bufferSize = 10;

const readStream = createReadStream(filePath, { highWaterMark: bufferSize });

let dataBuffer = '';
const evenNumbers = [];
const oddNumbers = [];

readStream.on('data', (chunk) => {
  
    dataBuffer += chunk.toString();
});


readStream.on('end', () => {

    const numbers = dataBuffer.split(',').map(num => parseInt(num, 10));

    const even = numbers.filter(num => num % 2 === 0);
    const odd = numbers.filter(num => num % 2 !== 0);


    console.log(`Total de números pares en el archivo ${filePath}: son ${even.length}:`);
    console.log('Los siguientes números son pares:');
    console.log(even.join(', '));

    console.log(`Total de números impares en el archivo ${filePath}: son ${odd.length}:`);
    console.log('Los siguientes números son impares:');
    console.log(odd.join(', '));
});

readStream.on('error', (err) => {
    console.error('Error al leer el archivo:', err);
});

