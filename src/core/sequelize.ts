import { CountryFactory } from './../models/Country';
import {Sequelize} from 'sequelize-cockroachdb';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config({path: __dirname + '/../../.env'});

console.log('DB CONNECTION IS:', process.env.NODE_ENV);

const { database, username, password, params } = require('../../config/db.json')[process.env.NODE_ENV];

console.log(`DB IS ${database}`);


let sequelize;

if(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {

    sequelize = new Sequelize(database, username, password, {
        dialect: params.dialect,
        host: process.env.DB_HOST || params.host,
        logging: params.logging,
        pool: {
          max: 5,
          min: 0,
          idle: 10000
        },
        storage: ':memory:'
    });

} else {

    const certPath =  path.resolve(__dirname, '../../config/certs/ca.crt');
    const cert = fs.readFileSync(certPath, 'utf8');   
  
    const clientkeyPath =  path.resolve(__dirname, '../../config/certs/client.aror_api.key');
    const clientKey = fs.readFileSync(clientkeyPath, 'utf8');  
  
    const clientCertPath =  path.resolve(__dirname, '../../config/certs/client.aror_api.crt');
    const clientCert = fs.readFileSync(clientCertPath, 'utf8');   
  
  
    sequelize = new Sequelize({
        database: database,
        username: username,
        password: password,
        dialect: params.dialect,
        host: params.host,
        logging: params.logging,
        port: params.port,
        pool: {
          max: 5,
          min: 0,
          idle: 10000
        },
        dialectOptions: {
            ssl: {
                ca: cert,
                key: clientKey,
                cert: clientCert
            }
           
        }
    });

}

export const db = {
    sequelize,
    Sequelize,
    Country: CountryFactory(sequelize, Sequelize)
}

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
  