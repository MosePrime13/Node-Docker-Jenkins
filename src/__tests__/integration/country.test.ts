import fastify from 'fastify';
import { Server, IncomingMessage, ServerResponse } from "http";


describe('/country', () => {

    let server: fastify.FastifyInstance<Server, IncomingMessage, ServerResponse>;

    beforeAll((done) => {

        server = require('../../server');
        console.log('______TEST SERVER STARTED______');

        done();
       
    });

    afterAll((done) => {
        server.close();
        console.log('______TEST SERVER CLOSED______');
        done();
    });

    describe('POST /', () => {

        it("should create country", async (done) => {
    
            const response = await server.inject({ method: "POST", url: "/country", payload: { name: 'Kenya', iso: 'KE' }  });
            expect(response.statusCode).toEqual(200);
            const payload = JSON.parse(response.payload);
            
            // expect(payload).toMatchObject({ msg: 'Mamam mia' });
    
            done();
        });
        
       });
    

   describe('GET /', () => {

    it("should fetch all countries", async (done) => {

        const response = await server.inject({ method: "GET", url: "/country" });
        expect(response.statusCode).toEqual(200);
        const payload = JSON.parse(response.payload);
        
        // expect(payload).toMatchObject({ msg: 'Mamam mia' });

        done();
    });
    
   });

   describe('GET /:id', () => {

    it('should return a country if valid id is passed', async(done) => {

        const country = await server.inject({ method: "POST", url: "/country", payload: { name: 'Tanzania', iso: 'TZ' }  });
        const country_payload = JSON.parse(country.payload);

        const response = await server.inject({ method: "GET", url: `/country/${country_payload.id}` });
        expect(response.statusCode).toEqual(200);
        const payload = JSON.parse(response.payload);
        

        done();
    });

   });
    
});