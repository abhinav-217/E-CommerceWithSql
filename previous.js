const express = require('express')
const app = express()
const port = 3000
const getUserDb = require('./DbConnect/getUserDb');
const session = require('express-session')
const ejs = require('ejs')

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("uploads"));
app.use(express.static("public"));
app.use(session({secret: 'keyboard is a dog',resave: false,saveUninitialized: true}))

getUserDb();

app.use("/",require("./Router/root"));
app.use("/login",require("./Router/routerlogin"));
app.use("/signup",require("./Router/routersignup"));
app.use("/reset",require("./Router/routerreset"));
app.use("/verify",require("./Router/routerverify"))
app.use("/forgot",require("./Router/routerforgot"))
app.use("/verifyF",require("./Router/routerverifyforgot"))
app.use("/loadMoreProducts/:size",require("./Router/routerloadmore"))
app.use("/addtocart",require("./Router/routeraddtocart"))
app.use('/cart',require("./Router/routercart"))
app.use('/increase',require("./Router/routerincrease"))
app.use('/getproducts',require("./Router/routergetproduct"))
app.use('/deleteitem',require("./Router/routerdelitem"))
app.use('/admin',require("./Router/routeradmin"))
app.use('/update',require("./Router/routerupdate"))
app.use('/deleteProduct',require("./Router/routerdelproduct"))
app.use('/sortProducts',require("./Router/routersortProduct"))
app.use('/addproduct',require("./Router/routeradminaddproduct"))
app.use('/sortProducts',require("./Router/routersortProduct"))
app.use('/searchCart',require('./Router/routersearchCart'))
app.use('/checkout',require("./Router/routercheckout"))
app.use('/markForOrder',require("./Router/routermarkForOrder"))
app.use('/logout',require("./Router/routerlogout"))
app.use('/userAccount',require("./Router/routeruserAccount"))
app.use('/openProduct',require("./Router/routeropenproduct"))

app.listen(port, () => {
  console.log(`http://localhost:${port}/`)
})