import express from 'express';
import fs from 'fs';

const app = express();
const port = 3002;

app.use(express.json());

// Función para leer y devolver los datos del archivo JSON
const readStudentsFromFile = () => {
  try {
    const data = fs.readFileSync('students.json', 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error al leer el archivo', err);
    return [];
  }
};

const saveStudentsToFile = (students) => {
  fs.writeFile('students.json', JSON.stringify(students, null, 2), (err) => {
    if (err) {
      console.error('Error al escribir el archivo', err);
    } else {
      console.log('Archivo students.json actualizado');
    }
  });
};

// Endpoint para obtener todos los estudiantes
app.get('/students', (req, res) => {
  const students = readStudentsFromFile();
  res.json(students);
});

// Endpoint para agregar un nuevo estudiante
app.post('/students', (req, res) => {
  const students = readStudentsFromFile();
  const newStudent = req.body;

  // Verificar si el ID proporcionado ya existe
  const existingIdStudent = students.find(student => student.id === newStudent.id);
  if (existingIdStudent) {
    return res.status(400).send('ID ya existe'); // Respuesta si el ID ya está en uso
  }

  // Verificar si el correo electrónico proporcionado ya existe
  const existingEmailStudent = students.find(student => student.email === newStudent.email);
  if (existingEmailStudent) {
    return res.status(400).send('Correo electrónico ya existe'); // Respuesta si el correo electrónico ya está en uso
  }

  // Agregar el nuevo estudiante si el ID y el correo electrónico son únicos
  students.push(newStudent);
  saveStudentsToFile(students);
  res.status(201).send('Estudiante agregado'); // Alumno agregado
});

// Endpoint para eliminar un estudiante por ID
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

// Endpoint para actualizar un estudiante por ID
app.put('/students/:id', (req, res) => {
  const students = readStudentsFromFile();
  const studentId = parseInt(req.params.id, 10);
  const updatedStudent = req.body;

  // Buscar el estudiante a actualizar
  const studentIndex = students.findIndex(student => student.id === studentId);

  if (studentIndex === -1) {
    return res.status(404).send('Estudiante no encontrado');
  }

  // Actualizar los datos del estudiante
  students[studentIndex] = { ...students[studentIndex], ...updatedStudent };
  saveStudentsToFile(students);
  res.send('Estudiante actualizado');
});

// Endpoint de prueba
app.get('/test', (req, res) => {
  res.send('Estamos en marcha');
});

app.listen(port, () => {
  console.log(`El servidor escuchando desde el puerto ${port}`);
});
