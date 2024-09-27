import { Request, Response, NextFunction } from 'express';
import handleUnknownRoutes from '../../middleware/unknownRoutes';

describe('handleUnknownRoutes Middleware', () => {
    let req: Request;
    let res: Response;
    let next: NextFunction;

    beforeEach(() => {
        req = {} as Request;
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response;
        next = jest.fn();
    });

    it('should respond with 404 and JSON message', () => {
        handleUnknownRoutes(req, res, next);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: "Route not found." });
        expect(next).not.toHaveBeenCalled();
    });
});
