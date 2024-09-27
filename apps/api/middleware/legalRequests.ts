import { Request, Response, NextFunction } from 'express';
import { listParams } from '../types/legalRequests';

export const validateName = (req: Request<listParams>, res: Response, next: NextFunction) => {
    const { name } = req.params;

    if (!name || name.trim() === '') {
        return res.status(400).json({ message: "Invalid author name provided." });
    }
    next();
};
