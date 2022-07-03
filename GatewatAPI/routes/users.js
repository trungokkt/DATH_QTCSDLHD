var express = require('express');
var router = express.Router();
var controller = require('../controllers/controller');
const auth = require('../middleware/auth');
const httpProxy = require('express-http-proxy')

const userServiceProxy = httpProxy('http://localhost:3000')

router.post('/login', (req, res, next) => {
    userServiceProxy(req, res, next)
});
router.get('/me', (req, res, next) => {
    userServiceProxy(req, res, next)
});
router.get('/signup', auth, (req, res, next) => {
    userServiceProxy(req, res, next)
  });

module.exports = router;