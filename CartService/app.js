var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

const redis = require('redis');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
var config = require('./config')

const redisClient = redis.createClient(config.redis.options);
(async () => {
    await redisClient.connect();
})();
redisClient.on('error', (err) => console.log('Redis Client Error', err));

redisClient.on('ready', () => {
    console.log('Successfully connected to Redis.')
});

config.redis.client = redisClient;
//connect mongo
require("./db/db_mongo");
var basketRouter = require('./routes/basket');
const auth = require('./middleware/auth');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    store: new RedisStore({
        client: config.redis.client
    }),
    secret: 'oigbvq#$151ioh3nti3yno13nyi3',
    resave: false,
    saveUninitialized: false,
}));



app.use(auth, async (req, res, next) => {
    // To show the application name on the page
    res.locals.applicationName = config.applicationName;
    return next();
});

app.use('/cart', basketRouter(config));

module.exports = app;
