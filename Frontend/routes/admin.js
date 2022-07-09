var express = require('express');
var router = express.Router();
const auth = require("../middleware/auth");
const { authAdmin } = require("../middleware/auth_user_type");
const adminController = require("../controller/adminController");

router.get("/product", auth, authAdmin, adminController.dashboard);
router.get("/user", auth, authAdmin, adminController.customer);
router.post("/product", auth, authAdmin, adminController.createProduct);
router.post("/product/update", auth, authAdmin, adminController.updateProduct);
router.delete("/order/delete/orderItem", auth, authAdmin, adminController.deleteOrderItem);
router.delete("/order/delete/orderItem/product", auth, authAdmin, adminController.deleteOrderItemProduct);
router.post("/order/inject-time", auth, authAdmin, adminController.setInjectTime);
router.put("/order/status", auth, authAdmin, adminController.updateStatusOrder);
router.post("/order/injected", auth, authAdmin, adminController.updateStatusOrderItem);

module.exports = router;
