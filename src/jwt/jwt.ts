import { sign } from 'jsonwebtoken';
import { SECRET } from '../env';

export function generateJWT(userId: string): string {
    const payload = {
        id: userId,
    };
    return sign(payload, SECRET, { expiresIn: '1h' });
}
