import request from 'supertest';
import { app } from '../main';

describe('App', () => {
    let server: any;

    beforeAll((done) => {
        server = app.listen(4000, done);
    });

    it('should respond with 404 for unknown routes', async () => {
        const response = await request(server).get('/unknown-route');

        expect(response.status).toBe(404);
        expect(response.body).toEqual({ message: "Route not found." });
    });

    it('should respond with 200 for known routes', async () => {
        const response = await request(server).get('/api/legal-requests/list/Jennifer%20Lopez');

        expect(response.status).toBe(200);
    });


    afterAll((done) => {
        server.close(done);
    });
});
