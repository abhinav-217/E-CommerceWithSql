const getProductDb = require('../DbConnect/getProductDb')
const getAllProducts = require('../Services/getAllProducts')
const addProd = require('../SqlServices/addProduct');
const getProduct = require('../SqlServices/getAllProducts')
const updateProduct = require('../SqlServices/updateProd')
const multer = require('multer')
const csv = require('csv-parser')
const fs = require('fs')
const maxSize = 0.25 * 1000 * 1000;
const path = require('path');
const updateProd = require('../SqlServices/updateProd');
const deleteProd = require('../SqlServices/deleteProd');
const sellerload = require('../SqlServices/sellerload');
const getSellerOrders = require('../SqlServices/getSellerOrders')
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, 'uploads/');
    },
    filename: function (req, file, callback) {
      callback(null, file.originalname + Date.now());
    }
  });
  var upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
      var ext = path.extname(file.originalname);
      if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
        return callback(new Error('Only images are allowed'))
      }
      callback(null, true)
    },
    limits: { fileSize: maxSize }
  })

async function openSeller(req, res) {
  let products = await getProduct();
  if (req.session.isSeller) {
    let user = {
      name: req.session.name,
      email: req.session.email,
      isSeller: req.session.isSeller
    }
    let result = products.filter((product) =>{return product.seller_id==req.session.email})
    // console.log(result)
    res.render('seller', { name: JSON.stringify(user), products: result, size: 4 })
  }
  else {
    res.redirect('/auth/login')
  }
}

async function get_addProd(req,res){
  if (req.session.isSeller) {
      let user = {
        name: req.session.name,
        email: req.session.email,
        isSeller:req.session.isSeller
      }
      res.render('addproduct', { name: JSON.stringify(user), err: "" })
    }
    else if (req.session.isLogIn) {
      res.redirect('/');
    }
    else {
      res.redirect('/auth/login');
    }
}

async function post_addProd(req,res){
  upload.single('photo')(req, res, async function (err) {
      if (err) {
        let user = {
          name: req.session.name,
          email: req.session.email,
        }
        return res.render('addproduct', { name: JSON.stringify(user), err: "Product Cannot be added check the size of image" })
      
      }
      let newProduct = {
        Sid:req.session.email,
        name: req.body.Pname,
        description: req.body.Pdescription,
        image: req.file.filename,
        price: req.body.Pprice,
        quantity: req.body.Pquantity
      }
      addProd(newProduct);
      req.session.isSeller = true;
      res.redirect('/seller/')
    });
}

async function update(req,res){
  let id = req.body.id;
  let description = req.body.details;
  let name = req.body.name;
  let price = req.body.price;
  let seller_id = req.body.company_name;
  let product = {
    id:id,
    description:description,
    name:name,
    price:price,
    seller_id:seller_id
  }
  let some = await updateProd(product)
  // console.log(some);
  let myStatus = {
    value: 1
  }
  res.json(myStatus)
}

async function delProd(req,res){
  let id = req.params.pId;
  deleteProd(id);
  res.redirect('/seller')
}

async function selload(req,res)
{
  let totalproducts = 4;
  let page = req.body.quantity;
  let result = await sellerload(page*4,totalproducts,req.session.email);
  res.json(result);
}

async function showSellerOrder(req,res) {
  if(req.session.isSeller)
  {
    let user = {
      name: req.session.name,
      email: req.session.email,
      isSeller: req.session.isSeller
    }
    let result = await getSellerOrders(req.session.email);
    // console.log(result)
    // res.send(result)
    res.render('sellerOrder', { name: JSON.stringify(user),products:result})

  }
  else
  {
    res.redirect('/auth/login')
  }
}

//=====================================// for mongodb //=========================================================================
// async function delProd(req,res){
//   let pId = req.params.pId;
//   let data = await getProductDb();
//   let result = data.deleteOne({ id: parseInt(pId) });
//   res.redirect('/admin')
// }

// async function update(req,res){
//   let pId = req.body.id;
//   let details = req.body.details;
//   let name = req.body.name;
//   let price = req.body.price;
//   let data = await getProductDb();
//   let products = await data.find({ id: parseInt(pId) }).toArray();
//   let update = await data.updateOne(
//     { id: parseInt(pId) },
//     {
//       $set: {
//         name: name,
//         price: parseFloat(price),
//         details: details
//       }
//     }
//   )
//   if (update.modifiedCount) {
//     let myStatus = {
//       value: 1
//     }
//     res.json(myStatus)
//   }
//   else {
//     res.send({})
//     return;
//   }
// }
// async function get_addProd(req,res){
//   if (req.session.isAdmin) {
//       let user = {
//         name: req.session.name,
//         username: req.session.username,
//         email: req.session.email,
//         phone: req.session.phone,
//         isAdmin:req.session.isAdmin
//       }
//       res.render('addproduct', { name: JSON.stringify(user), err: "" })
//     }
//     else if (req.session.isLogIn) {
//       res.redirect('/');
//     }
//     else {
//       res.redirect('/login');
//     }
// }

// async function post_addProd(req,res){
//   upload.single('photo')(req, res, async function (err) {
//       if (err) {
//         let user = {
//           name: req.session.name,
//           username: req.session.username,
//           email: req.session.email,
//           phone: req.session.phone,
//         }
//         return res.render('addproduct', { name: JSON.stringify(user), err: "Product Cannot be added check the size of image" })
      
//       }
//       let data = await getProductDb();
//       let products = await getAllProducts();
//       let mx = -1;
//       products.forEach((p) => {
//         if (p.id > mx) {
//           mx = p.id;
//         }
//       })
//       let newProduct = {
//         id: mx + 1,
//         name: req.body.Pname,
//         details: req.body.Pdescription,
//         image: req.file.filename,
//         price: req.body.Pprice,
//         quantity: req.body.Pquantity
//       }
//       let result = await data.insertOne(newProduct);
//       res.redirect('/admin')
//     });
// }

module.exports = { openSeller, post_addProd,get_addProd,update,delProd,selload,showSellerOrder}