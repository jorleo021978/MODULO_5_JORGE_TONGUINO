import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Configuración de la ruta del archivo
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, 'students.json');

const app = express();
const port = 3002;

app.use(express.json());

// Función para leer y devolver los datos del archivo JSON
const readStudentsFromFile = () => {
  try {
    // Verificar si el archivo existe
    if (!fs.existsSync(filePath)) {
      // Si el archivo no existe, crearlo con un array vacío
      fs.writeFileSync(filePath, JSON.stringify([]));
    }
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error al leer el archivo', err);
    return [];
  }
};

// Función para guardar los datos en el archivo JSON
const saveStudentsToFile = (students) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(students, null, 2), 'utf-8');
    console.log('Archivo students.json actualizado');
  } catch (err) {
    console.error('Error al escribir el archivo', err);
  }
};

// Función para actualizar los IDs de los estudiantes
const updateStudentIds = (students) => {
  return students.map((student, index) => ({
    ...student,
    id: index + 1
  }));
};

// Endpoint para obtener todos los estudiantes
app.get('/students', (req, res) => {
  try {
    const students = readStudentsFromFile();
    res.json(students);
  } catch (err) {
    res.status(500).send('Error al obtener los estudiantes');
  }
});

// Endpoint para agregar un nuevo estudiante
app.post('/students', (req, res) => {
  try {
    const students = readStudentsFromFile();
    const newStudent = req.body;

    // Verificar si el correo electrónico proporcionado ya existe
    if (students.some(student => student.email === newStudent.email)) {
      return res.status(400).send('Correo electrónico ya existe');
    }

    // Agregar el nuevo estudiante si el correo electrónico es único
    students.push(newStudent);

    // Actualizar los IDs
    const updatedStudents = updateStudentIds(students);
    saveStudentsToFile(updatedStudents);
    res.status(201).send('Estudiante agregado');
  } catch (err) {
    res.status(500).send('Error al agregar el estudiante');
  }
});

// Endpoint para eliminar un estudiante por ID
app.delete('/students/:id', (req, res) => {
  try {
    const students = readStudentsFromFile();
    const studentId = parseInt(req.params.id, 10);

    if (isNaN(studentId)) {
      return res.status(400).send('ID inválido');
    }

    const updatedStudents = students.filter(student => student.id !== studentId);

    if (students.length === updatedStudents.length) {
      return res.status(404).send('Estudiante no encontrado');
    }

    // Actualizar los IDs después de eliminar un estudiante
    const reindexedStudents = updateStudentIds(updatedStudents);
    saveStudentsToFile(reindexedStudents);
    res.send('Estudiante eliminado');
  } catch (err) {
    res.status(500).send('Error al eliminar el estudiante');
  }
});

// Endpoint para actualizar un estudiante por ID
app.put('/students/:id', (req, res) => {
  try {
    const students = readStudentsFromFile();
    const studentId = parseInt(req.params.id, 10);
    const updatedStudent = req.body;

    if (isNaN(studentId)) {
      return res.status(400).send('ID inválido');
    }

    // Buscar el índice del estudiante a actualizar
    const studentIndex = students.findIndex(student => student.id === studentId);

    if (studentIndex === -1) {
      return res.status(404).send('Estudiante no encontrado');
    }

    // Verificar si el correo electrónico proporcionado ya existe en otro estudiante
    const emailExists = students.some(
      (student, index) =>
        student.email === updatedStudent.email &&
        student.id !== studentId
    );

    if (emailExists) {
      return res.status(400).send('El correo electrónico ya está en uso');
    }

    // Verificar si el ID está intentando cambiarse
    if (updatedStudent.id && updatedStudent.id !== studentId) {
      return res.status(400).send('El ID no puede ser modificado');
    }

    // Actualizar los datos del estudiante
    students[studentIndex] = { ...students[studentIndex], ...updatedStudent };

    // Guardar los cambios en el archivo
    saveStudentsToFile(students);
    res.send('Estudiante actualizado');
  } catch (err) {
    res.status(500).send('Error al actualizar el estudiante');
  }
});

// Endpoint de prueba
app.get('/test', (req, res) => {
  res.send('Estamos en marcha');
});

app.listen(port, () => {
  console.log(`El servidor está escuchando en el puerto ${port}`);
});
