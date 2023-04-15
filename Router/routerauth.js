const express = require('express')
const router = express.Router()

const {render_signup,checkSignup,render_verify,verifyUser,render_login,checkLogin,
logout,render_forgot,forgot,render_verifyF,checkVerifyf,render_reset,resetPassword} = require('../Controllers/controllerauth')

router.route("/signup").get(render_signup)
.post(checkSignup)

router.route("/verify").get(render_verify)
.post(verifyUser)

router.route("/login").get(render_login)
.post(checkLogin)

router.route("/forgot").get(render_forgot)
.post(forgot)

router.route("/verifyF").get(render_verifyF)
.post(checkVerifyf)

router.route("/reset").get(render_reset)
.post(resetPassword)

router.route("/logout").get(logout)

module.exports = router;