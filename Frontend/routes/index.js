var express = require("express");

var router = express.Router();
const loginController = require("../controller/loginController");
const userController = require("../controller/userController");
const auth = require('../middleware/auth')
const auth_require = require('../middleware/auth_require')
const unAuth = require('../middleware/unauth')

/* GET home page. */
router.get("/", auth, userController.index);
router.get("/search", auth, userController.search);
router.get("/detail/:code", auth, userController.productDetail);
router.get("/login",unAuth, loginController.index);
router.post("/login",unAuth, loginController.login);

router.get("/logout",auth, auth_require, loginController.logout);
router.get("/injection-registration",auth, auth_require, userController.injection_registration);
router.post("/addCart",auth, auth_require, userController.addCart);
router.post("/getCart",auth, auth_require, userController.getCart);
router.post("/deleteCart",auth, auth_require, userController.deleteCart);
router.post("/deleteCart/all",auth, auth_require, userController.deleteAllCart);
router.post("/updateCart",auth, auth_require, userController.updateCart);

router.post("/order",auth,auth_require,userController.createOrder)
router.get("/bang-gia",auth, auth_require, userController.table_price)

router.get("/tra-cuu-thong-tin",auth, auth_require, userController.lookup_information_index)
router.get("/contact-us",auth, userController.contact_us)

module.exports = router;