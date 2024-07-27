import esperarSegundos from './async.js';

const ejecutar = async () => {
    console.log('esperando 5 segundos...');
    await esperarSegundos(1);
    console.log('!listo!');
    await esperarSegundos(3);
    console.log('!Genial bien venido al mundo de la praogramación!');
};
ejecutar();
