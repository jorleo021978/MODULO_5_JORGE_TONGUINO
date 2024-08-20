// ./middlewares/validation.js
const validationMiddleware = (req, res, next) => {
    const {  id, age, email, identity, user, password } = req.body;
    
    if (typeof id !== 'number' || isNaN(id) || id < 0) {
        return res.status(400).json({ message: 'El ID debe ser un número.' });
    }

    if (typeof age !== 'number' || isNaN(age) || age < 0) {
        return res.status(400).json({ message: 'Edad inválida. La edad debe ser un número no negativo.' });
    }

    if (!email || typeof email !== 'string' || email.trim() === '') {
        return res.status(400).json({ message: 'Correo electrónico inválido. El correo electrónico debe ser una cadena no vacía.' });
    }

    if (typeof identity !== 'number' || identity < 0) {
        return res.status(400).json({ message: 'Identidad inválida debe ser un número no negativo.' });
    }    

    if (!user || typeof user !== 'string' || user.trim() === '') {
        return res.status(400).json({ message: 'Usuario inválido. El usuario debe ser una cadena no vacía.' });
    }

    next();
};

export default validationMiddleware;
