var express = require('express');
var router = express.Router();
var productController = require('../controllers/productController');

router.post('/',productController.createProduct);
router.get('/', productController.getProduct, productController.getProductByCode);
router.get('/name', productController.getProductByName);
router.put('/', productController.updateProduct);

// router.get('/:code', auth, controller.createAccount);
// router.get('/name', auth, controller.createAccount);
// router.get('/array', auth, controller.createAccount);

module.exports = router;