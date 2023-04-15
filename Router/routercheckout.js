const express = require('express')
const router = express.Router()

const {checkout} = require('../Controllers/controllercheckout')

router.route("/").get(checkout)

module.exports = router;