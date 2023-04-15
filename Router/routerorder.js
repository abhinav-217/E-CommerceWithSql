const express = require('express')
const router = express.Router()

const {orderGet,orderPost,orderCOD,getAmount,userOrders,getConfirmation} = require('../Controllers/controllerorder')

router.route("/placeOrder").get(orderGet)
.post(orderPost)
router.route("/orderCOD").get(orderCOD)
router.route("/userOrders").get(userOrders)
router.route("/getAmount").post(getAmount)
router.route("/getConfirmation").post(getConfirmation)


module.exports = router;