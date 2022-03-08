import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { generateJWT } from '../jwt/jwt';
import { User } from './user.model';

export async function signup(req: Request, res: Response): Promise<any> {
    try {
        const result = validationResult(req).formatWith(({ msg }) => msg as string);
        if (!result.isEmpty()) {
            return res.status(400).json(result.array());
        }

        const userName = req.body.userName as string;

        const search = await User.findOne({ userName });
        if (search) {
            return res.status(400).json({ message: `User with username "${userName}" already exists` });
        }

        const user = new User({ userName });
        await user.save();

        return res.status(201).json(generateJWT(user._id as string));
    } catch (e) {
        res.status(400);
        return res.json({ message: e.message });
    }
}
