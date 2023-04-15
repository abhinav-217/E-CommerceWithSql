const express = require('express')
const router = express.Router()

const {showcart,addtocart,increase,searchCart,checkout} = require('../Controllers/controllercart')

router.route("/").get(showcart)

router.route("/addtocart/:pId").get(addtocart)

router.route("/updateQuantity").post(increase)

router.route("/searchCart").post(searchCart)

router.route("/checkout").get(checkout)

module.exports = router;