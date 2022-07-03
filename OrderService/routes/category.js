var express = require('express');
var router = express.Router();
var categoryController = require('../controllers/categoryController')
/* GET all listing. */
router.get('/', categoryController.getAll);
// router.get('/code', vaccineController.findProductByCode);
// router.get('/id', vaccineController.findProductById);
// router.post('/array', vaccineController.findProductByArray);
// router.get('/name', vaccineController.findProduct);
// router.post('/', vaccineController.createProduct);
// router.put('/', vaccineController.updateProduct)
module.exports = router;
