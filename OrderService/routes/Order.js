var express = require('express');
var router = express.Router();
var orderController = require("../controllers/orderController");
const auth = require('../middleware/auth');
const auth_emp_ad =require("../middleware/auth_emp_ad")
/* GET users listing. */
router.get('/',auth, orderController.orderByAccount);
router.get('/all',auth , auth_emp_ad, orderController.findOrder,orderController.findOrderbyPhone);

router.post('/',auth, orderController.createOrder);

//router.post('/delete',auth , auth_emp_ad,  orderController.deleteOrderItem);

router.delete('/delete/orderItem',auth , auth_emp_ad,  orderController.deleteOrderItem);
router.delete('/delete/orderItem/product', orderController.deleteProductInOrderItem);

module.exports = router;