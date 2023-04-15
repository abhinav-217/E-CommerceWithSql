const express = require('express')
const router = express.Router()

const {openAdmin,get_addProd,post_addProd,update,delProd} = require('../Controllers/controlleradmin')

router.route("/").get(openAdmin)

router.route("/addproduct").get(get_addProd)
.post(post_addProd)

router.route("/update").post(update)
router.route("/deleteProduct/:pId").get(delProd)

module.exports = router;