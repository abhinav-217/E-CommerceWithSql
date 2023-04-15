const getProductDb = require('../DbConnect/getProductDb')
const getAllProducts = require('../SqlServices/getAllProducts');
const showmore = require('../SqlServices/showmore');
const getUserAdd = require('../SqlServices/getUserAdd');
//=============== this is for the mogodb db =====================//
// async function root_render(req,res){
//     let data = await getProductDb();
//     let products = await data.find().toArray();
//     if (req.session.isLogIn) {
//       let user = {
//         name: req.session.name,
//         username: req.session.username,
//         email: req.session.email,
//         phone: req.session.phone,
//         isAdmin: req.session.isAdmin
//       }
//       res.render('root', { name: JSON.stringify(user), products: products, size: 4 })
//     }
//     else {
  //       res.render('root', { name: JSON.stringify({}), products: products, size: 4 })
  //     }
  // }
  
  // async function getProduct(req,res){
    //   let page = parseInt(req.body.quantity);
    //   let totalproducts = 4;
    //   let data = await getProductDb();
    //   let products = await data.find().skip(page * totalproducts).limit(totalproducts).toArray();
    //   res.json(products)
    // }
    
    // ============================================== SQL Code ======================================================

async function root_render(req,res){
  let products = await showmore(0,4);
  if (req.session.isLogIn) {
    let user = {
      name: req.session.name,
      email: req.session.email,
      isAdmin: req.session.isAdmin,
      isSeller:req.session.isSeller
    }
    res.render('root', { name: JSON.stringify(user), products: products, size: 4 })
  }
  else {
    res.render('root', { name: JSON.stringify({}), products: products, size: 4 })
  }
}

async function getProduct(req,res){
  let page = parseInt(req.body.quantity);
  let totalproducts = 4;
  let products = await showmore(page*4,totalproducts)
  res.json(products)
}

async function userAccount(req,res){
  res.send("Page for User Account Details")
}
async function getUserAddress(req,res){
  let email = req.body.id;
  let result = await getUserAdd(email);
  res.json(result);
}

module.exports = {root_render,getProduct,userAccount,getUserAddress};