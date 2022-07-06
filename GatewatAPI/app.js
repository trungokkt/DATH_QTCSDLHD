var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');


var app = express();

app.use(logger('dev'));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const httpProxy = require('express-http-proxy');

const userServiceProxy = httpProxy('http://localhost:3003')
app.all('/customer/', (req, res, next) => {
    userServiceProxy(req,res,next)
});
app.all('/customer/*', (req, res, next) => {
    userServiceProxy(req,res,next)
});

const vaccineServiceProxy = httpProxy('http://localhost:3002')
app.all('/vaccines', (req, res, next) => {
    vaccineServiceProxy(req,res,next)
});
app.all('/vaccines/*', (req, res, next) => {
    vaccineServiceProxy(req,res,next)
});

const categoryServiceProxy = httpProxy('http://localhost:3002')
app.all('/categories', (req, res, next) => {
    categoryServiceProxy(req,res,next)
});
app.all('/categories/*', (req, res, next) => {
    categoryServiceProxy(req,res,next)
});

const cartServiceProxy = httpProxy('http://localhost:3004')
app.all('/cart', (req, res, next) => {
    cartServiceProxy(req,res,next)
});
app.all('/cart/*', (req, res, next) => {
    cartServiceProxy(req,res,next)
});

const orderServiceProxy = httpProxy('http://localhost:3002')
app.all('/order', (req, res, next) => {
    orderServiceProxy(req,res,next)
});
app.all('/order/*', (req, res, next) => {
    orderServiceProxy(req,res,next)
});

module.exports = app;
