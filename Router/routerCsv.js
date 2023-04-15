const express = require('express')
const router = express.Router()
const {addCsv} = require('../Controllers/controllerCsv')

router.route("/").post(addCsv)

module.exports = router;