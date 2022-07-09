var express = require('express');
var router = express.Router();
var orderController = require("../controllers/orderController");
const auth = require('../middleware/auth');
const auth_emp_ad = require("../middleware/auth_emp_ad")
/* GET users listing. */
router.get('/', auth, orderController.orderByAccount);
router.get('/all', auth, auth_emp_ad, orderController.findOrder, orderController.findOrderbyPhone);
router.post('/', auth, orderController.createOrder);
router.put('/status', auth, auth_emp_ad, orderController.updateStatusOrder);

//router.post('/delete',auth , auth_emp_ad,  orderController.deleteOrderItem);

router.delete('/delete/orderItem', auth, auth_emp_ad, orderController.deleteOrderItem);
router.delete('/delete/orderItem/product', auth, auth_emp_ad, orderController.deleteProductInOrderItem);
router.post('/inject-time', auth, auth_emp_ad, orderController.setInjectTime);
router.post('/injected', auth, auth_emp_ad, orderController.updateStatusOrderItem);

module.exports = router;