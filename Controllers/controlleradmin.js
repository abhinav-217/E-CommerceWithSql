const getProductDb = require('../DbConnect/getProductDb')
const getAllProducts = require('../Services/getAllProducts')
const addProd = require('../SqlServices/addProduct');
const getProduct = require('../SqlServices/getAllProducts')
const updateProduct = require('../SqlServices/updateProd')
const multer = require('multer')
const maxSize = 0.25 * 1000 * 1000;
const path = require('path');
const showmore = require('../SqlServices/showmore');
const updateProd = require('../SqlServices/updateProd');
const deleteProd = require('../SqlServices/deleteProd');

//Defining the Multer Storage options
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'uploads/');
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname + Date.now());
  }
});
//Defining the Type of files that to be uploaded
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

// ============================================== SQL DB ================================================== 


async function openAdmin(req, res) {
  // Rendering the admin page 
  let products = await showmore(0,4);
  if (req.session.isAdmin) {
    let user = {
      name: req.session.name,
      email: req.session.email,
      isAdmin: req.session.isAdmin
    }
    res.render('admin', { name: JSON.stringify(user), products: products, size:4 })
  }
  else {
    res.redirect('/auth/login')
  }
}

async function get_addProd(req,res){
  //Rendering the get add prod page 
  if (req.session.isAdmin) {
      let user = {
        name: req.session.name,
        email: req.session.email,
        isAdmin:req.session.isAdmin
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
  //Post request for the product addition to DB
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
      //Adding the product to DB 
      addProd(newProduct);
      res.redirect('/admin')
    });
}

async function update(req,res){
  // Endpoint for updation of project 
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
  let myStatus = {
    value: 1
  }
  res.json(myStatus)
}

async function delProd(req,res){
  //Endpoint for deletion of the product
  let id = req.params.pId;
  deleteProd(id);
  res.redirect('/admin')
}


// ============================================== Mongo DB ======================================== 

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

module.exports = { openAdmin, post_addProd,get_addProd,update,delProd}