import { writeFile, createReadStream } from 'fs';

// Generar números del 1 al 1000, separados por coma
const numbers = Array.from({ length: 1000 }, (_, i) => i + 1).join(',');

writeFile('numeros.txt', numbers, (err) => {
    if (err) throw err;
    console.log('El archivo numeros.txt ha sido creado con los números del 1 al 1000.');

    const readStream = createReadStream('numeros.txt', 'utf-8');
    let dataBuffer = '';

    readStream.on('data', (chunk) => {
        dataBuffer += chunk;
    });

    readStream.on('end', () => {
        console.log('Contenido del archivo numeros.txt:');
        console.log(dataBuffer);
    });

    readStream.on('error', (err) => {
        console.error('Error al leer el archivo:', err);
    });
});
