# API de Gestión de Estudiantes

Esta es una API construida con Node.js y Express para gestionar una lista de estudiantes. 
Permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre un archivo JSON (students.json) que almacena los datos de los estudiantes.

## Requisitos

- Node.js instalado en tu máquina.
Si no tienes la librería express, puedes instalarla ejecutando:

  npm install express

  npm install nodemon

## Descripción del Código

El archivo server.js contiene el código para crear y gestionar el servidor Express. 

### Importación de Módulos


import express from 'express';
import fs from 'fs';


express: Librería para construir el servidor y manejar las rutas HTTP.
fs: Módulo de Node.js para trabajar con el sistema de archivos.

### Configuración del Servidor

const app = express(); para menjo de rutas.
const port = 3002; la direcion; localhost:3002 es el puerto de entrada.

app.use(express.json());

app: = Instancia de Express.
port = Puerto en el que el servidor escuchará las solicitudes.

app.use(express.json()): Middleware para analizar el cuerpo de las solicitudes HTTP en formato JSON.

### Funciones para Manipular el Archivo JSON

#### Leer Estudiantes del Archivo

const readStudentsFromFile = () => {
  try {
    const data = fs.readFileSync('students.json', 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error al leer el archivo', err);
    return [];
  }
};

readStudentsFromFile: Lee el archivo `students.json` y devuelve el contenido como un array de objetos. Si ocurre un error, devuelve un array vacío.

#### Guardar Estudiantes en el Archivo

const saveStudentsToFile = (students) => {
  fs.writeFile('students.json', JSON.stringify(students, null, 2), (err) => {
    if (err) {
      console.error('Error al escribir el archivo', err);
    } else {
      console.log('Archivo students.json actualizado');
    }
  });
};


saveStudentsToFile: Guarda el array de estudiantes en el archivo students.json. Utiliza JSON.stringify para convertir el array a formato JSON y formatea el archivo con una sangría de 2 espacios.

### Endpoints de la API

#### Obtener Todos los Estudiantes


app.get('/students', (req, res) => {
  const students = readStudentsFromFile();
  res.json(students);
});


GET /students: Devuelve la lista completa de estudiantes en formato JSON.
localhost:3002/students
localhost:3002/students?user=jorleo

#### Agregar un Nuevo Estudiante


app.post('/students', (req, res) => {
  const students = readStudentsFromFile();
  const newStudent = req.body;

  const existingIdStudent = students.find(student => student.id === newStudent.id);
  if (existingIdStudent) {
    return res.status(400).send('ID ya existe');
  }

  const existingEmailStudent = students.find(student => student.email === newStudent.email);
  if (existingEmailStudent) {
    return res.status(400).send('Correo electrónico ya existe');
  }

  students.push(newStudent);
  saveStudentsToFile(students);
  res.status(201).send('Estudiante agregado');
});


POST /students: Agrega un nuevo estudiante a la lista. Verifica que el id y el email sean únicos antes de agregar el estudiante. Responde con 201 Created; si el estudiante se agrega exitosamente, o 400 Bad Reques si el id o el email ya existen.
localhost:3002/students

#### Eliminar un Estudiante por ID

app.delete('/students/:id', (req, res) => {
  const students = readStudentsFromFile();
  const studentId = parseInt(req.params.id, 10);
  
  const updatedStudents = students.filter(student => student.id !== studentId);

  if (students.length === updatedStudents.length) {
    res.status(404).send('Estudiante no encontrado');
  } else {
    saveStudentsToFile(updatedStudents);
    res.send('Estudiante eliminado');
  }
});


DELETE /students/:id: Elimina un estudiante de la lista por su ID. Responde con 200, OK si el estudiante se elimina exitosamente, o 404 Not Found si el estudiante no existe.
localhost:3002/students/:id

#### Actualizar un Estudiante por ID

app.put('/students/:id', (req, res) => {
  const students = readStudentsFromFile();
  const studentId = parseInt(req.params.id, 10);
  const updatedStudent = req.body;

  const studentIndex = students.findIndex(student => student.id === studentId);

  if (studentIndex === -1) {
    return res.status(404).send('Estudiante no encontrado');
  }

  students[studentIndex] = { ...students[studentIndex], ...updatedStudent };
  saveStudentsToFile(students);
  res.send('Estudiante actualizado');
});


PUT /students/:id: Actualiza la información de un estudiante existente por su ID. Responde con 200 OK si el estudiante se actualiza exitosamente, o 404 Not Found si el estudiante no existe.
localhost:3002/students/:id

#### Endpoint de Prueba


app.get('/test', (req, res) => {
  res.send('Estamos en marcha');
});


GET /test: Endpoint de prueba que simplemente devuelve el mensaje Estamos en marcha, para verificar que el servidor está en funcionamiento.
localhost:3002/test

### Ejecución

Para ejecutar el servidor, asegúrate de estar en la misma carpeta que index.js y ejecuta:
node index.js


Accede a la API a través de http://localhost:3002 en tu navegador o utilizando herramientas como Postman para probar las rutas mencionadas.

## Archivos

index.js: Contiene todo el código de la API.
students.json: Archivo donde se almacenan los datos de los estudiantes en formato JSON. 
Este archivo se crea y actualiza automáticamente según las operaciones CRUD realizadas.

## Notas

Asegúrate de que students.json esté en la misma carpeta que index.js.
El archivo students.json se creará automáticamente la primera vez que se ejecute el endpoint POST /students.

## Rutas.

GET /students
GET /students?name=un nombre
GET /students?id=un nombre
GET /students?user=un nombre
POST /students
DELETE /students/1
PUT /students/1

## Autor

API de Gestión de Estudiantes creada como ejemplo para tareas CRUD usando Node.js y Express.

Este archivo se ejecuta con el scripts:
npm run dev

Este README.md proporciona una explicación completa del código y cómo funciona la API. 
Incluye detalles sobre cada endpoint, la configuración y cómo ejecutar el servidor.

Docente: Daniel Lopez Charry.
Estudiante: Jorge Leonel Tonguino P.