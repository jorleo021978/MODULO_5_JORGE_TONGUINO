const estudiantes = [
    { nombre: "Pedro", edad: 29, promedio: 7.9 },
    { nombre: "Ana", edad: 33, promedio: 8.9 },
    { nombre: "Pablo", edad: 32, promedio: 9.5 },
    { nombre: "Juan", edad: 25, promedio: 6.0 },
    { nombre: "Maria", edad: 28, promedio: 7.3 },
    { nombre: "Andres", edad: 45, promedio: 8.7 },
];

let mayorPromedioFor = estudiantes[0]; //no me funciona con una const

for(let i = 1; i < estudiantes.length; i++){
    if (estudiantes[i].promedio > mayorPromedioFor.promedio){
        mayorPromedioFor = estudiantes[i];
    }
}

console.log(`(con el metodo for) El promedio mas alto es de ${mayorPromedioFor.nombre}, con ${mayorPromedioFor.promedio}% con edad de: ${mayorPromedioFor.edad} años`)

const mayorPromedioReduce = estudiantes.reduce((max, estudiante) =>{
    return(estudiante.promedio > max.promedio) ? estudiante : max;
}, estudiantes[0]);
console.log(`(con metodo reducce) El promedio mas alto es; ${mayorPromedioReduce.nombre}, con ${mayorPromedioReduce.promedio}%`);

let menorPromedioFor = estudiantes[0];
for (let i = 1; i < estudiantes.length; i++){
    if (estudiantes[i].promedio < menorPromedioFor.promedio) {
        menorPromedioFor = estudiantes[i];
    }
}

console.log(`(con el metodo for) El estudiante ${menorPromedioFor.nombre}, tiene el promedio mas bajo con ${menorPromedioFor.promedio}% con la edad de ${mayorPromedioFor.edad} años`);

const menorPromedioReduce = estudiantes.reduce((max, estudiante) =>{
    return(estudiante.promedio < max.promedio) ? estudiante : max;
}, estudiantes[0]);
console.log(`(con metodo reducce) El promedio mas bajo es; ${menorPromedioReduce.nombre}, con ${menorPromedioReduce.promedio}%, con ${mayorPromedioFor.edad} años`);
