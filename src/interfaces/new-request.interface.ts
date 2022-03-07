import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface newRequest extends Request {
    jwtPayload?: JwtPayload;
}
