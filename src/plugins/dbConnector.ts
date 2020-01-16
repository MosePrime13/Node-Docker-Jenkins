import fastify from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import { db } from '../core/sequelize';


async function dbConnector(app: fastify.FastifyInstance, options){
    const connect = await db.sequelize.sync({ force: true });
    if(connect){

        const data = {
            db: db
        }  
        app.decorate('cockroachdb', data);
    
    }
}

export default fastifyPlugin(dbConnector);