const express = require('express')
const app = express()
const port = 3000
const session = require('express-session')
const ejs = require('ejs')
const pool = require('./DbConnect/conSql')
const Razorpay = require('razorpay')
const cors = require('cors')
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("uploads"));
app.use('/cart', express.static('uploads'))
app.use('/order', express.static('uploads'))
app.use(session({ secret: 'keyboard is a dog', resave: false, saveUninitialized: true }))
// getUserDb();
app.use("/", require("./Router/root"));
app.use("/auth", require("./Router/routerauth"));
app.use('/cart', require("./Router/routercart"))
app.use('/admin', require("./Router/routeradmin"))
app.use('/seller', require("./Router/routerseller"))
app.use('/order', require("./Router/routerorder"))
app.use('/addCsv', require('./Router/routerCsv'))


// app.post("/api/payment/verify", (req, res) => {

//   let body = req.body.response.razorpay_order_id + "|" + req.body.response.razorpay_payment_id;
//   console.log(req.body)
//   var crypto = require("crypto");
//   var expectedSignature = crypto.createHmac('sha256', '<YOUR_API_SECRET>')
//     .update(body.toString())
//     .digest('hex');
//   console.log("sig received ", req.body.response.razorpay_signature);
//   console.log("sig generated ", expectedSignature);
//   var response = { "signatureIsValid": "false" }
//   if (expectedSignature === req.body.response.razorpay_signature)
//     response = { "signatureIsValid": "true" }
//   res.send(response);
// });
app.listen(port, () => {
  console.log(`http://localhost:${port}/`)
})