var express = require('express');
var router = express.Router();
var cartController = require('../controllers/cartController');
const auth = require('../middleware/auth');

router.get('/', auth, cartController.getCart);
router.post('/', auth, cartController.createCart);
router.delete("/", auth, cartController.deleteCart);
router.put("/", auth, cartController.updateCart);


module.exports = router;