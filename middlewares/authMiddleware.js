import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'Token de autenticación no proporcionado.' });
    }
    jwt.verify(token, 'secreto', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token de autenticación inválido.' });
        }
        req.userId = decoded.userId;
        next();
    });
};

export default verifyToken;
