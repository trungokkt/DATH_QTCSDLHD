var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var orderRouter = require('./routes/Order');
var vaccineRouter = require('./routes/vaccine');
var categoryRouter = require('./routes/category');
require('./db/db_mongo')
var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/order', orderRouter);
app.use("/vaccines", vaccineRouter);
app.use("/categories", categoryRouter);

module.exports = app;
