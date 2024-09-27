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

    it("should return 200 and list of requests for valid author", async () => {
        const mockRequests = [{ id: 1, author: "John Doe", request: "Request details" }];
        (getRequestsByAuthor as jest.Mock).mockReturnValue(mockRequests);

        const response = await request(app).get("/list/John%20Doe");

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockRequests);
        expect(getRequestsByAuthor).toHaveBeenCalledWith("John Doe");
    });

    it("should return 404 if no requests are found for the author", async () => {
        (getRequestsByAuthor as jest.Mock).mockReturnValue([]);

        const response = await request(app).get("/list/Unknown Author");

        expect(response.status).toBe(404);
        expect(response.body).toEqual({ message: "No requests found for the specified author." });
        expect(getRequestsByAuthor).toHaveBeenCalledWith("Unknown Author");
    });

    // test the middleware to catch the error
    it("should return 400 if name parameter is missing", async () => {
        const response = await request(app).get("/list/%20");

        expect(response.status).toBe(400);
        expect(response.body).toEqual({ message: "Invalid author name provided." });
    });
});
