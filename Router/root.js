const express = require('express')
const router = express.Router()

const {root_render,getProduct,userAccount,getUserAddress} = require('../Controllers/root')

router.route("/").get(root_render)

router.route("/getproducts").post(getProduct)

router.route("/userAccount").get(userAccount)
router.route("/getUserAddress").post(getUserAddress)

module.exports = router;