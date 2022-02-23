const express = require('express');
const { sequelize,Gallery } = require('./models');
const path = require('path');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const history = require('connect-history-api-fallback');

const app = express();

function getCookies(req) {
    if (req.headers.cookie == null) return {};

    const rawCookies = req.headers.cookie.split('; ');
    const parsedCookies = {};

    rawCookies.forEach( rawCookie => {
        const parsedCookie = rawCookie.split('=');
        parsedCookies[parsedCookie[0]] = parsedCookie[1];
    });

    return parsedCookies;
};

function authToken(req, res, next) {



    const cookies = getCookies(req);
    const token = cookies['token'];

    if (token == null) return res.redirect(307, '/admin/login');
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    
        if (err) return res.redirect(307, '/admin/login');
    
        req.user = user;
    
        next();
    });
}

app.get('/admin/register', (req, res) => {
    res.sendFile('register.html', { root: './static/admin' });
});

app.get('/admin/login', (req, res) => {
    res.sendFile('login.html', { root: './static/admin' });
});

app.get('/admin/users',authToken, (req, res) => {
    res.sendFile('users.html', { root: './static/admin' });
});

app.get('/admin/galleries',authToken, (req, res) => {
    res.sendFile('galleries.html', { root: './static/admin' });
});

app.get('/admin/photos',authToken, (req, res) => {
    res.sendFile('photos.html', { root: './static/admin' });
});

app.get('/admin/privileges',authToken, (req, res) => {
    res.sendFile('privileges.html', { root: './static/admin' });
});

app.get('/admin/adminPanel', authToken, (req, res) => {
        res.sendFile('adminPanel.html', { root: './static/admin'  });
});


app.use(express.static(path.join(__dirname, 'static')));


const staticMdl = express.static(path.join(__dirname, 'dist'));

app.use(staticMdl);

app.use(history({ index: '/index.html' }));   // dist is ignored

app.use(staticMdl);

app.listen({ port: 8000 }, async () => {
    await sequelize.authenticate();
});