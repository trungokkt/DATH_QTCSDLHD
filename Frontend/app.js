var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var exphbs = require('express-handlebars');
var session = require('express-session');

const redis = require('redis');
const connectRedis = require('connect-redis');

var logger = require('morgan');

var indexRouter = require('./routes/index');
var AdminRouter = require('./routes/admin');



var app = express();

app.engine('hbs', exphbs.engine({
    layoutsDir: path.join(__dirname, "views/layouts"),
    partialsDir: path.join(__dirname, "views/partials"),
    defaultLayout: 'main',
    extname: 'hbs',
    helpers: {
        formatMoney: function (num) {
            const currencySign = 'đ'
            const decimalLength = 0
            const chunkDelimiter = '.'
            const decimalDelimiter = ','
            const chunkLength = 3
            var result = '\\d(?=(\\d{' + chunkLength + '})+' + (decimalLength > 0 ? '\\D' : '$') + ')';
            let number = num.toFixed(Math.max(0, ~~decimalLength));
            return (
                (decimalDelimiter ? number.replace('.', decimalDelimiter) : num).replace(
                    new RegExp(result, 'g'),
                    '$&' + chunkDelimiter
                ) + currencySign
            );

        },
        json: function (context) {
            return JSON.stringify(context);
        },
        if_eq: function (a, b, opts) {
            return (a == b) ? opts.fn(this) : opts.inverse(this);
        }
    }
}));
app.set('view engine', 'hbs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());

// enable this if you run behind a proxy (e.g. nginx)
app.set('trust proxy', 1);
const RedisStore = connectRedis(session)
//Configure redis client
const redisClient = redis.createClient({
    url: `redis://${process.env.REDIS_HOST || 'localhost'}:6379`,
    legacyMode: true
})

redisClient.on('error', function (err) {
    console.log('Could not establish a connection with redis. ' + err);
});
redisClient.on('connect', function (err) {
    console.log('Connected to redis successfully');
});

redisClient.connect().catch(console.error)


app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    store: new RedisStore({
        client: redisClient
    }),
    resave: false,
    saveUninitialized: true,
    secret: 'somesecret',
    cookie: {
        secure: false, // if true only transmit cookie over https
        httpOnly: false, // if true prevent client side JS from reading the cookie 
        maxAge: 365 * 24 * 60 * 60
    }
}));
app.use('/', indexRouter);
app.use('/admin', AdminRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;