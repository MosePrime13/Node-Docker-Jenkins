import fastify from 'fastify';

export default function (app: fastify.FastifyInstance, options, done){

    const db = app['cockroachdb'].db;

    app.get('/', {}, async(req, res) => {

        const dela = await db.Country.bulkCreate([
            { iso: 'KE', name: 'Kenya' }
        ]);

        res.send({ msg: 'Mamam mia' });

    });


    app.post('/country', {}, async(req, res) => {

        const dela = await db.Country.bulkCreate(req.body);

        res.send({ msg: 'Mamam mia' });

    });


    done();

};