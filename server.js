const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const authRouter = require('./api/auth/auth-router');
const petsRouter = require('./api/pets/pets-router');

const server = express();

server.use(logger('dev'));
server.use(helmet());

const allowedOrigins = ['http://localhost:5174'];

server.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true,
}));

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use('/', authRouter);
server.use('/pets', petsRouter);

module.exports = server;
