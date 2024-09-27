import { Request, Response } from 'express';
import { validateName } from '../../middleware/legalRequests';
import {listParams} from "../../types/legalRequests";


const mockRequest = (params: Partial<listParams>) => ({
    params,
} as Request<listParams>);

const mockResponse = () => {
    const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    };
    return res as Response;
};

const mockNext = jest.fn();

describe('validateName Middleware', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should call next() for a valid name', () => {
        const req = mockRequest({ name: 'Jennifer Lopez' });
        const res = mockResponse();
        const next = mockNext;

        validateName(req, res, next);

        expect(next).toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalled();
    });

    it('should return 400 for an empty name', () => {
        const req = mockRequest({ name: '' });
        const res = mockResponse();
        const next = mockNext;

        validateName(req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: "Invalid author name provided." });
        expect(next).not.toHaveBeenCalled();
    });

    it('should return 400 for a whitespace name', () => {
        const req = mockRequest({ name: '    ' });
        const res = mockResponse();
        const next = mockNext;

        validateName(req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: "Invalid author name provided." });
        expect(next).not.toHaveBeenCalled();
    });
});
