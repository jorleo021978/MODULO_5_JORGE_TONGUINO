const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || authHeader !== 'Bearer mysecrettoken') {
        return res.status(403).json({ message: 'Forbidden: Invalid or missing token' });
    }
    
    next();
};

export default authMiddleware;


