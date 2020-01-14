import fastify from 'fastify';
import { Server, IncomingMessage, ServerResponse } from "http";


describe('/country', () => {

    let server: fastify.FastifyInstance<Server, IncomingMessage, ServerResponse>;
    // let db;

    beforeEach(() => {

        server = require('../../server');

        // jest.clearAllMocks();
    });

    afterEach(() => {
        server.close();
    });

   describe('GET /', () => {

    it("GET returns 200", async done => {

        const response = await server.inject({ method: "GET", url: "/" });
        expect(response.statusCode).toEqual(200);
        // const payload = JSON.parse(response.payload);
        // expect(payload).toMatchObject({ msg: 'Mamam mia' });

        done();
    });
    

   });
    
});