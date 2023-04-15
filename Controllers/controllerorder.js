const updateAddress = require('../SqlServices/updateAddress')
const getUserAdd = require('../SqlServices/getUserAdd')
const getCartItems = require('../SqlServices/getCartItems')
const transaction = require('../SqlServices/transaction')
const getPrice = require('../SqlServices/getPrice')
const getOrder = require('../SqlServices/gettUserOrder')
const Razorpay = require('razorpay')
const { json } = require('express')
async function orderPost(req, res) {
    //For updating and adding the address of user
    let result = await getUserAdd(req.session.email)
    if (result.length > 0) {
        let id = result[0].Address_id;
        let status = await updateAddress(2, req.body, req.session.email, id);
        let stats = {
            status: status,
        }
        res.json(stats);
    }
    else {
        let status = await updateAddress(1, req.body, req.session.email, 1);
        let stats = {
            status: status,
        }
        res.json(stats);
    }
}
async function orderGet(req, res) {
    if (req.session.isLogIn) {
        //Rendering the order page
        let result = await getCartItems(req.session.email)
        let userAdd = await getUserAdd(req.session.email);
        if (userAdd.length > 0 && result.length > 0) {
            let totalPrice = 0;
            result.forEach((p) => {
                if (p.quant >= p.quantity) {
                    p.inStock = false;
                }
                else {
                    p.inStock = true;
                    totalPrice += p.price * p.quant;
                }
            })
            // console.log("The total price is: ", totalPrice);
            totalPrice = parseFloat(totalPrice.toFixed(2))
            res.render('order', { products: result, err: [], totalPrice: totalPrice })
        }
        else {
            if (result.length < 0) {
                let err = { mess: 1 };
                res.render('order', { products: [], err: err, totalPrice: 0 })
            }
            else {
                let err = { mess: 2 };
                res.render('order', { products: [], err: err, totalPrice: 0 })
            }
        }
    }
    else {
        res.redirect('/auth/login');
    }
}
async function orderCOD(req, res) {
    // Endpoint for Cash on delivery      
    if (req.session.isLogIn) {
        let address = await getUserAdd(req.session.email);
        let result = await getCartItems(req.session.email);
        if (address.length > 0 && result.length > 0) {
            let totalPrice = 0;
            result.forEach((p) => {
                if (p.quant >= p.quantity) {
                    p.inStock = false;
                }
                else {
                    p.inStock = true;
                    totalPrice += p.price * p.quant;
                }
            })
            totalPrice = parseFloat(totalPrice.toFixed(2))
            transaction(result, address, totalPrice, req.session.email, "COD", (mess, prod) => {
                // console.log(mess);
                if (mess == 1) {
                    res.render('final', { products: prod })
                }
                else {
                    res.send("Cannot place order");
                }
            });
        }
        else {
            res.redirect('/cart')
        }
    }
    else {
        res.redirect('/auth/login');
    }
}
async function getAmount(req, res) {
    let price = await getPrice(req.session.email);
    price = parseFloat(price);
    // console.log(price)
    var instance = new Razorpay({
        key_id: 'rzp_test_wdCQSGYRNzgH6s',
        key_secret: 'XoQmGrRYUnkIfxrIKIhI41Ps',
    });
    let order = await instance.orders.create({
        amount: price * 100,
        currency: "INR",
        receipt: "rcp11",
    })
    res.status(201).json({
        success: true,
        order: order,
        price,
    })
}
async function userOrders(req, res) {
    if (req.session.isLogIn) {
        let user = {
            name: req.session.name,
            email: req.session.email,
            isSeller: req.session.isSeller,
            isAdmin:req.session.isAdmin
        }
        let result = await getOrder(req.session.email);
        res.render('userOrder', { name: JSON.stringify(user), products: result })
    }
    else {
        res.redirect('/auth/login')
    }
}
async function getConfirmation(req, res) {
    // console.log(req.body)
    // For Online payment gateway after successfull payment confirmation
    if (req.body.success == 1) {
        let address = await getUserAdd(req.session.email);
        let result = await getCartItems(req.session.email);
        if (address.length > 0 && result.length > 0) {
            let totalPrice = 0;
            result.forEach((p) => {
                if (p.quant >= p.quantity) {
                    p.inStock = false;
                }
                else {
                    p.inStock = true;
                    totalPrice += p.price * p.quant;
                }
            })
            totalPrice = parseFloat(totalPrice.toFixed(2))
            transaction(result, address, totalPrice, req.session.email, "Online", (mess, prod) => {
                if (mess == 1) {
                    res.json(prod)
                    // console.log("Order Confirmed");
                }
                else {
                    res.json({})
                    // console.log("Cannot place order");
                }
            });
        }
        // console.log("Payment Successfull");
    }
    else {
        // console.log("Payment Unsuccessfull")
    }
}
module.exports = { orderPost, orderGet, orderCOD, getAmount, userOrders, getConfirmation }