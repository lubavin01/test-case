import { NextFunction, Response } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import { SECRET } from '../env';
import { newRequest } from '../interfaces/new-request.interface';

export default function (req: newRequest, res: Response, next: NextFunction): any {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        req.jwtPayload = verify(token, SECRET, { complete: false }) as JwtPayload;
        return next();
    } catch (e) {
        return res.status(403).json({ message: 'Not authorized' });
    }
}
