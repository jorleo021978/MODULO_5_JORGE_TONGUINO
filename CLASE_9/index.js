// ./index.js
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import validationMiddleware from './middlewares/validation.js';
import authMiddleware from './middlewares/authMiddleware.js'

// Crear __filename y __dirname utilizando fileURLToPath
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3002;

app.use(express.json());
app.use(authMiddleware);

const filePath = path.join(__dirname, 'students.json'); // Ruta al archivo students.json

const readFromFile = (filePath) => {
    try {
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, JSON.stringify([]));
        }
        const data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error al leer el archivo', err);
        return [];
    }
};

const saveToFile = (filePath, data) => {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
        console.log(`Archivo ${path.basename(filePath)} actualizado`);
    } catch (err) {
        console.error('Error al escribir el archivo', err);
    }
};

const updateIds = (data) => {
    return data.map((item, index) => ({
        ...item,
        id: index + 1 
    }));
};

// Endpoint para crear un nuevo estudiante
app.post('/students', validationMiddleware, authMiddleware, (req, res, next) => {
    try {
        const students = readFromFile(filePath);
        const newStudent = req.body;

        // Verificar si el correo electrónico, identidad, usuario o contraseña ya están en uso
        if (students.some(student => student.email === newStudent.email)) {
            return res.status(400).json({ message: 'Correo electrónico ya existe' });
        }

        if (students.some(student => student.identity === newStudent.identity)) {
            return res.status(400).json({ message: 'La identidad ya está en uso' });
        }

        if (students.some(student => student.user === newStudent.user)) {
            return res.status(400).json({ message: 'El nombre de usuario ya está en uso' });
        }


        // Asignar un nuevo ID y agregar el estudiante
        const newId = students.length > 0 ? students[students.length - 1].id + 1 : 1;
        newStudent.id = newId;
        students.push(newStudent);

        // Guardar los datos actualizados en el archivo
        const updatedStudents = updateIds(students);
        saveToFile(filePath, updatedStudents);

        // Responder con el estudiante agregado
        res.status(201).json({
            message: 'Estudiante agregado exitosamente',
            student: newStudent
        });
    } catch (err) {
        res.status(500).send('Error al agregar el estudiante');
    }
});

// Endpoint para obtener todos los estudiantes
app.get('/students', (req, res) => {
    try {
        const students = readFromFile(filePath);
        const { name, user } = req.query;

        let filteredStudents = students;

        if (name) {
            filteredStudents = filteredStudents.filter(student =>
                student.name.toLowerCase().includes(name.toLowerCase())
            );
        }

        if (user) {
            filteredStudents = filteredStudents.filter(student =>
                student.user.toLowerCase() === user.toLowerCase()
            );
        }

        res.json(filteredStudents);
    } catch (err) {
        res.status(500).send('Error al obtener los estudiantes');
    }
});

// Endpoint para obtener un estudiante por ID
app.get('/students/:id', validationMiddleware, authMiddleware, (req, res) => {
    try {
        const students = readFromFile(filePath);
        const studentId = parseInt(req.params.id, 10);
        
        if (isNaN(studentId)) {
            return res.status(400).send('ID inválido');
        }

        const student = students.find(student => student.id === studentId);

        if (!student) {
            return res.status(404).send('Estudiante no encontrado');
        }

        res.json(student);
    } catch (err) {
        res.status(500).send('Error al obtener el estudiante');
    }
});

// Endpoint para actualizar un estudiante por ID
app.put('/students/:id', validationMiddleware, (req, res) => {
    try {
        const students = readFromFile(filePath);
        const studentId = parseInt(req.params.id, 10);
        const updatedStudent = req.body;

        if (isNaN(studentId)) {
            return res.status(400).send('ID inválido');
        }

        const studentIndex = students.findIndex(student => student.id === studentId);

        if (studentIndex === -1) {
            return res.status(404).send('Estudiante no encontrado');
        }

        // Verificar si el correo electrónico, identidad, usuario o contraseña ya están en uso por otro usuario
        if (students.some(student => student.email === updatedStudent.email && student.id !== students[studentIndex].id)) {
            return res.status(400).send('El correo electrónico ya está en uso');
        }

        if (students.some(student => student.identity === updatedStudent.identity && student.id !== students[studentIndex].id)) {
            return res.status(400).send('La identidad ya está en uso');
        }

        if (students.some(student => student.user === updatedStudent.user && student.id !== students[studentIndex].id)) {
            return res.status(400).send('El nombre de usuario ya está en uso');
        }

        if (students.some(student => student.password === updatedStudent.password && student.id !== students[studentIndex].id)) {
            return res.status(400).send('La contraseña ya está en uso');
        }

        students[studentIndex] = { ...students[studentIndex], ...updatedStudent };
        saveToFile(filePath, students);
        res.send('Estudiante actualizado');
    } catch (err) {
        res.status(500).send('Error al actualizar el estudiante');
    }
});

// Endpoint para eliminar un estudiante por ID
app.delete('/students/:id', (req, res) => {
    try {
        const students = readFromFile(filePath);
        const studentId = parseInt(req.params.id, 10);

        if (isNaN(studentId)) {
            return res.status(400).send('ID inválido');
        }

        const updatedStudents = students.filter(student => student.id !== studentId);

        if (students.length === updatedStudents.length) {
            return res.status(404).send('Estudiante no encontrado');
        }

        const reindexedStudents = updateIds(updatedStudents);
        saveToFile(filePath, reindexedStudents);

        res.send('Estudiante eliminado');
    } catch (err) {
        res.status(500).send('Error al eliminar el estudiante');
    }
});

app.listen(port, () => {
    console.log(`El servidor escucha en el puerto ${port}`);
});
