import fastify from 'fastify';
import dotenv from 'dotenv';
import helmet from 'fastify-helmet';
import { Server, IncomingMessage, ServerResponse } from "http";

dotenv.config({ path: __dirname + '/../.env' });

import dbConnector from './plugins/dbConnector';
import routes from './routes';

const app: fastify.FastifyInstance<
    Server,
    IncomingMessage,
    ServerResponse
> = fastify({
    logger: false,
    pluginTimeout: 100000
});


app.register(helmet);
app.register(dbConnector);

routes(app);

app.listen(Number(process.env.PORT), '0.0.0.0', function(err, address){
    if(err){
        app.log.error(err);
        process.exit(1);
    }
    app.log.info(`Server listening on port ${address}`)
});

module.exports = app;