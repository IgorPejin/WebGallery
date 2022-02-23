const express = require('express');
const { sequelize, Users } = require('./models');
const rest = require('./routes/rest');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use('/', rest);

var corsOptions = {
    origin: 'http://localhost:8000',
    optionsSuccessStatus: 200
}

app.use(express.json());
app.use(cors(corsOptions));

app.listen({ port: 7000 }, async () => {
    await sequelize.authenticate();
});