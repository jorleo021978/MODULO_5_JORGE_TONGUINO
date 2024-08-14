app.post('/students', (req, res) => {
    try {
        const students = readFromFile(filePath);
        const newStudent = req.body;

        if (students.some(student => student.email === newStudent.email)) {
            return res.status(400).send('Correo electrónico ya existe');
        }

        if (students.some(student => student.id === newStudent.id)) {
            return res.status(400).send('El ID ya está en uso');
        }

        students.push(newStudent);

        const updatedStudents = updateIds(students);
        saveToFile(filePath, updatedStudents);

        res.status(201).send('Estudiante agregado');
    } catch (err) {
        res.status(500).send('Error al agregar el estudiante');
    }
});

app.put('/students/:id', (req, res) => {
    try {
        const students = readFromFile(filePath);
        const studentId = parseInt(req.params.id, 10);
        const updatedStudent = req.body;

        if (isNaN(studentId)) {
            return res.status(400).send('Id inválido');
        }

        const studentIndex = students.findIndex(student => student.id === studentId);

        if (studentIndex === -1) {
            return res.status(404).send('Estudiante no encontrado');
        }

        // Verificar si el nuevo ID ya existe en otro estudiante (excluyendo el estudiante actual)
        if (updatedStudent.id && students.some(student => student.id === updatedStudent.id && student.id !== studentId)) {
            return res.status(400).send('El ID ya está en uso por otro estudiante');
        }

        // Verificar si el correo electrónico ya está en uso por otro estudiante (excluyendo el estudiante actual)
        if (students.some(student => student.email === updatedStudent.email && student.id !== studentId)) {
            return res.status(400).send('El correo electrónico ya está en uso');
        }

        if (students.some(student => student.email === updatedStudent.email && student.id !== studentId)) {
            return res.status(400).send('El correo electrónico ya está en uso');
        }

        students[studentIndex] = { ...students[studentIndex], ...updatedStudent };
        saveToFile(filePath, students);
        res.send('Estudiante actualizado');
    } catch (err) {
        res.status(500).send('Error al actualizar el estudiante');
    }
});
