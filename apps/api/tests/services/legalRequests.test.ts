// src/__tests__/legalRequests.test.ts

import { getRequestsByAuthor, loadData } from "../../services/legalRequests";
import fs from 'fs';
import path from 'path';

jest.mock('fs');

describe('Legal Requests Service', () => {
    const mockData = [
        {
            "id": "7a51a54f-84e1-43d3-a5f0-2a459ab3c9a2",
            "title": "Legal Consultancy for Public-Private Partnership Agreements",
            "author": "Linda Rodriguez",
            "createdAt": 1710478394,
            "published": false,
            "auction": true
        },
        {
            "id": "605e4f25-d498-4a42-a2d1-5cb49a17696e",
            "title": "Intellectual Property Management and Litigation Support",
            "author": "Elizabeth Hernandez",
            "createdAt": 1710593530,
            "published": false,
            "auction": true
        },
        {
            "id": "1da876ee-6269-4449-b0aa-c560c4d466b1",
            "title": "Intellectual Property Management and Litigation Support",
            "author": "Maria Garcia",
            "createdAt": 1732141339,
            "published": false,
            "auction": true
        },
    ];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('loadData', () => {
        it('should return an empty array when the file is empty', () => {
            (fs.readFileSync as jest.Mock).mockReturnValue('');
            const data = loadData();
            expect(data).toEqual([]);
        });

        it('should return an empty array when the file does not exist', () => {
            (fs.readFileSync as jest.Mock).mockImplementation(() => {
                throw new Error('File not found');
            });
            const data = loadData();
            expect(data).toEqual([]);
        });

        it('should return an empty array when the data is not an array', () => {
            (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify({}));
            const data = loadData();
            expect(data).toEqual([]);
        });

        it('should load and parse data correctly when the file contains valid JSON', () => {
            (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(mockData));
            const data = loadData();
            expect(data).toEqual(mockData);
        });

        it('should log an error if reading the file fails', () => {
            const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
            (fs.readFileSync as jest.Mock).mockImplementation(() => {
                throw new Error('Error reading file');
            });
            const data = loadData();
            expect(data).toEqual([]);
            expect(consoleErrorSpy).toHaveBeenCalledWith('Error loading data:', 'Error reading file');
            consoleErrorSpy.mockRestore();
        });
    });

    describe('getRequestsByAuthor', () => {
        it('should return requests matching the author name', () => {
            (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(mockData));
            const results = getRequestsByAuthor('Elizabeth Hernandez');
            expect(results).toEqual([
                {
                    "id": "605e4f25-d498-4a42-a2d1-5cb49a17696e",
                    "title": "Intellectual Property Management and Litigation Support",
                    "author": "Elizabeth Hernandez",
                    "createdAt": 1710593530,
                    "published": false,
                    "auction": true
                }
            ]);
        });

        it('should return an empty array if no requests match the author name', () => {
            (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(mockData));
            const results = getRequestsByAuthor('Alice');
            expect(results).toEqual([]);
        });

        it('should return an empty array when data loading fails', () => {
            (fs.readFileSync as jest.Mock).mockImplementation(() => {
                throw new Error('File not found');
            });
            const results = getRequestsByAuthor('Alice');
            expect(results).toEqual([]);
        });
    });
});
