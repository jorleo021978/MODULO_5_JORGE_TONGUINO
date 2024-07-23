const estudiantes = [
    { nombre: "Pedro", edad: 29, promedio: 7.9 },
    { nombre: "Ana", edad: 33, promedio: 8.9 },
    { nombre: "Pablo", edad: 32, promedio: 9.5 },
    { nombre: "Juan", edad: 25, promedio: 6.0 },
    { nombre: "Maria", edad: 28, promedio: 7.3 },
    { nombre: "Andres", edad: 45, promedio: 8.7 },
];

const sumaEdades = estudiantes.reduce((total, estudiante) => total + estudiante.edad, 0);

const totalEdadEstudiantes = estudiantes.length;

const promedioEdades = sumaEdades / totalEdadEstudiantes;


    console.log(`La suam de la edad de todos los estudiantes es: ${sumaEdades}, Y el promedio de la edad de los estudiantes es: ${promedioEdades} años`);