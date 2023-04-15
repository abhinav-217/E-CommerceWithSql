const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer({dest:'uploads/'})
const csv = require('csv-parser')
const fs = require('fs')
const {openSeller,get_addProd,post_addProd,update,delProd,selload,showSellerOrder} = require('../Controllers/controllerseller')

router.route("/").get(openSeller)

router.route("/addproduct").get(get_addProd)
.post(post_addProd)
router.route("/update").post(update)
router.route("/deleteProduct/:pId").get(delProd)
router.route("/sellerloadmore").post(selload)
router.route("/sellerOrder").get(showSellerOrder)

module.exports = router;