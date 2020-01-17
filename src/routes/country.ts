import fastify from 'fastify';

export default function (app: fastify.FastifyInstance, options, done){

    const db = app['cockroachdb'].db;

    
    app.post('/country', {}, async(req, res) => {

        const dela = await db.Country.create(req.body);

        res.send(dela);

    });

    app.get('/country', {}, async(req, res) => {

        // throw new Error('Something went bad');

        const dela = await db.Country.findAll();
        res.send(dela);

    });

    app.get('/country/:id', {}, async(req, res) => {

        const dela = await db.Country.findOne({ where: { id: req.params.id }, raw: true });

        res.send(dela);

    });

    // app.post('/country', {}, async(req, res) => {

    //     const dela = await db.Country.bulkCreate(req.body);

    //     res.send({ msg: 'Mamam mia' });

    // });


    done();

};