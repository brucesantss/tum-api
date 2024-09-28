import jwt, {JwtPayload} from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import 'dotenv/config';

interface User {
    email: string;
    role: string;
  }
  
export const generateToken = (user: User) => {
    return jwt.sign({
        email: user.email,
        role: user.role
    },
    process.env.JWT_SECRET_KEY,
    {expiresIn: process.env.JWT_EXPIRESIN}
)
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ message: 'cabeçalho de autorização ausente.' });
    }

    const token = authHeader.split(' ')[1];

    if(!token){
        return res.status(401).json({ message: 'nenhum token fornecido.' })
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        (req as any).user = decoded;

    } catch (err) {
        return res.status(403).json({ message: 'token inválido ou expirado.' });
    };

    next();
}