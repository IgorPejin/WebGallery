const express = require('express');
const { sequelize, Users } = require('./models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const cors = require('cors');
require('dotenv').config();

const app = express();


var corsOptions = {
    origin: 'http://localhost:8000',
    optionsSuccessStatus: 200
}

app.use(express.json());
app.use(cors(corsOptions));


app.post('/register', (req, res) => {

    console.log(req.body)
    console.log(req.body.bio)

    let adminInt=0;

    if(req.body.admin)
        adminInt=1;
    else if(req.body.moderator)
        adminInt=0
    else
        adminInt=2

    const obj = {
        username: req.body.username,
        email: req.body.email,
        user_type: adminInt,
        bio:req.body.bio,
        password: bcrypt.hashSync(req.body.password, 10)
    };

    const schema = Joi.object({
        username: Joi.string().alphanum().min(3).max(30).required(),
        password: Joi.string().min(4).required(),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com','net','rs'] } })
    })

    const { error, value } = schema.validate({ username: obj.username, password: req.body.password, email:obj.email });

    if(error)
    {
        res.status(400).json({ msg: ""+error}); 
    }
    else
    {
    Users.create(obj).then( rows => {

        const usr = {
            id:rows.id,
            username: rows.username,
            password:rows.password,
            email:rows.email,
            user_type:rows.user_type
        };

        const token = jwt.sign(usr, process.env.ACCESS_TOKEN_SECRET);
        
        res.json({ token: token});

    }).catch( err => {
        console.log("usao u create")
        console.log(err);
        res.status(500).json(err) 
    });
    }
});

app.post('/login', (req, res) => {


    Users.findOne({ where: { username: req.body.username } })
        .then( usr => {

            if (bcrypt.compareSync(req.body.password, usr.password)) {
                const obj = {
                    id:usr.id,
                    username: usr.username,
                    password:usr.password,
                    email:usr.email,
                    user_type:usr.user_type
                };
        
                const token = jwt.sign(obj, process.env.ACCESS_TOKEN_SECRET);
                
                res.json({ token: token, user_type:obj.user_type });
            } else {
                res.status(400).json({ msg: "Invalid credentials"});
            }
        })
        .catch( err => {
            res.status(400).json({ msg: "No user in database"});
    });
});

app.listen({ port: 9000 }, async () => {
    await sequelize.authenticate();
});