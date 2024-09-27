import fs from 'fs';
import path from 'path';
import {legalRequestsData} from "../types/legalRequests";

export const loadData = (): legalRequestsData[] => {
    const filePath = path.join(__dirname, "../requests-data.json");

    try {
        const jsonData = fs.readFileSync(filePath, 'utf-8');

        // If the file is empty, return an empty array
        if (!jsonData) {
            console.warn('The file is empty. Returning an empty array.');
            return [];
        }

        const data = JSON.parse(jsonData);

        // If the data is not an array, throw an error
        if (!Array.isArray(data)) {
            throw new Error('Invalid data format: expected an array.');
        }

        return data
            .sort((a, b) => {
                return b.createdAt - a.createdAt;
            }) as legalRequestsData[];
    } catch (error) {

        if (error instanceof Error) {
            console.error('Error loading data:', error.message);
        } else {
            console.error('An unknown error occurred while loading data.');
        }

        // If an error occurs, return an empty array.
        return [];
    }
};

export const getRequestsByAuthor = (name: string): legalRequestsData[] => {
    const data = loadData();
    return data.filter((request) => request.author.toLowerCase() === name.toLowerCase());
};
