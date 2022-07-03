var express = require('express');
var router = express.Router();
var productController = require('../controllers/productController');

router.get('/', productController.getCategory);

// router.get('/:code', auth, controller.createAccount);
// router.get('/name', auth, controller.createAccount);
// router.get('/array', auth, controller.createAccount);

module.exports = router;