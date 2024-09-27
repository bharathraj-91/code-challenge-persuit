import request from "supertest";
import express from "express";
import legalRequestsRouter from "../../routes/legalRequests";
import { getRequestsByAuthor } from "../../services/legalRequests";

jest.mock("../../services/legalRequests");

const app = express();
app.use(express.json());
app.use(legalRequestsRouter);

describe("GET /list/:name", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should return 200 and paginated list of requests for valid author", async () => {
        // create an array of 15 requests
        const mockRequests = Array.from({ length: 15 }, (_, i) => ({
            id: i + 1,
            author: "Alice",
            request: `Request details`,
            date: `2023-09-01`
        }));
        (getRequestsByAuthor as jest.Mock).mockReturnValue(mockRequests);

        const response = await request(app).get("/list/Alice?page=1&limit=10");

        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(10);
        expect(response.body.currentPage).toBe(1);
        expect(response.body.totalResults).toBe(15);
        expect(response.body.totalPages).toBe(2);
        expect(getRequestsByAuthor).toHaveBeenCalledWith("Alice");
    });

    it("should return second page of requests for valid author", async () => {
        const mockRequests = Array.from({ length: 15 }, (_, i) => ({
            id: i + 1,
            author: "Alice",
            request: `Request details`,
            date: `2023-09-01`
        }));
        (getRequestsByAuthor as jest.Mock).mockReturnValue(mockRequests);

        const response = await request(app).get("/list/Alice?page=2&limit=10");

        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(5);
        expect(response.body.currentPage).toBe(2);
        expect(response.body.totalResults).toBe(15);
        expect(response.body.totalPages).toBe(2);
        expect(response.body.data[0].id).toBe(11);
    });

    it("should return 404 if no requests are found for the author", async () => {
        (getRequestsByAuthor as jest.Mock).mockReturnValue([]);

        const response = await request(app).get("/list/Unknown%20Author");

        expect(response.status).toBe(404);
        expect(response.body).toEqual({ message: "No requests found for the specified author." });
        expect(getRequestsByAuthor).toHaveBeenCalledWith("Unknown Author");
    });

    it("should return 400 if name is empty", async () => {
        const response = await request(app).get("/list/%20");

        expect(response.status).toBe(400);
        expect(response.body).toEqual({ message: "Invalid author name provided." });
    });

    it("should return 200 with default pagination if no pagination parameters are provided", async () => {
        const mockRequests = Array.from({ length: 15 }, (_, i) => ({
            id: i + 1,
            author: "Alice",
            request: `Request details`,
            date: `2023-09-01`
        }));
        (getRequestsByAuthor as jest.Mock).mockReturnValue(mockRequests);

        const response = await request(app).get("/list/Alice");

        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(10);
        expect(response.body.currentPage).toBe(1);
        expect(response.body.totalResults).toBe(15);
        expect(response.body.totalPages).toBe(2);
    });
});
