function esperarSegundos (segundos){
    return new Promise((resolve) => {
        const miliSegundos = segundos * 1000;
        setTimeout(() =>{
            console.log(`Espera ${segundos} segundos.`);
            resolve();
        }, miliSegundos)
    });
};
export default esperarSegundos;
