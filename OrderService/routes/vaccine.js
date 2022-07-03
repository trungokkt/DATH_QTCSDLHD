var express = require('express');
var router = express.Router();
var vaccineController = require('../controllers/vaccineController')
/* GET all listing. */
router.get('/', vaccineController.getAllProduct);
router.get('/code', vaccineController.findProductByCode);
router.get('/id', vaccineController.findProductById);
router.get('/array', vaccineController.findProductByArray);
router.get('/name', vaccineController.findProduct);
router.post('/', vaccineController.createProduct);
router.put('/', vaccineController.updateProduct)
router.delete('/', vaccineController.deleteProduct)

module.exports = router;
