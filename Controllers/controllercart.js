const CartSchemaModel = require('../Schema/Cart')
const getAllProducts = require('../Services/getAllProducts')
const getUser = require('../Services/getUser')
const getCartProducts = require('../Services/getCartProducts')
const getProduct = require('../SqlServices/getoneprod')
const checkProd = require('../SqlServices/checkProd')
const cartMethods = require('../SqlServices/cartMethods')
const getCartItems = require('../SqlServices/getCartItems')
const getUserAdd = require('../SqlServices/getUserAdd')


// ====================================================== MONGO DB Code =========================================================
{
// async function showcart(req, res) {
//   if (req.session.isLogIn) {
// let user = {
//   name: req.session.name,
//   email: req.session.email,
//   username: req.session.username,
//   phone: req.session.phone,
//   isAdmin: req.session.isAdmin
// }
//     let tofind = await getUser(req);
//     let cartPresent = await getCartProducts(tofind);
//     let products = await getAllProducts();
//     let updateCartProducts = [];
//     if (cartPresent.length > 0) {
//       let cartProducts = cartPresent[0].cartItems;
//       cartProducts.forEach((p) => {
//         for (let i = 0; i < products.length; i++) {
//           if (products[i].id == p.pId) {
//             let newProduct = {
//               pId: products[i].id,
//               pname: products[i].name,
//               price: products[i].price,
//               image: products[i].image,
//               image: products[i].image,
//               quantity: p.quantity,
//               isForOrder: p.isForOrder
//             }
//             updateCartProducts.push(newProduct);
//           }
//         }
//       })
//     }
//     let result = await CartSchemaModel.updateOne({ userid: tofind }, { $set: { cartItems: updateCartProducts } })
//     if (cartPresent.length) {
//       res.render('cart', { name: JSON.stringify(user), products: updateCartProducts })
//     }
//     else {
//       res.render('cart', { name: JSON.stringify(user), products: [] })
//     }
//   }
//   else {
//     res.redirect('/login');
//   }
// }

// async function addtocart(req,res){
//   if (req.session.isLogIn) {
//       const productId = req.params.pId;
//       const email = req.session.email;
//       let products = await getProduct(productId);
//       let tofind = await getUser(req);
//       const cartPresent = await getCartProducts(tofind);
//       let item = {
//         pId: products[0].id,
//         pname: products[0].name,
//         price: products[0].price,
//         image: products[0].image,
//         quantity: 1,
//         isForOrder:false
//       }
//       if (cartPresent.length) {
//         let prevCartItems = cartPresent[0].cartItems;
//         let chk = false;
//         prevCartItems.forEach((p) => {
//           if (p.pId == item.pId) {
//             p.quantity++;
//             chk = true;
//           }
//         })
//         if (chk) {
//           let result = await CartSchemaModel.updateOne({ userid: tofind }, { $set: { cartItems: prevCartItems } })
//         }
//         else {
//           prevCartItems.push(item);
//           let result = await CartSchemaModel.updateOne({ userid: tofind }, { $set: { cartItems: prevCartItems } })
//         }
//       }
//       else {
//         let pro = [];
//         pro.push(item);
//         const cartUser = new CartSchemaModel();
//         cartUser.userid = tofind;
//         cartUser.cartItems = pro;
//         let saveCartUser = cartUser.save();
//       }
//       res.redirect('/cart')
//       return;
//     }
//     res.redirect('/login')
// }

// async function increase(req,res){
//   if (req.session.isLogIn) {
//       let pId = req.params.pId;
//       let chk = req.params.chk;
//       let tofind = await getUser(req);
//       let cartPresent = await getCartProducts(tofind)
//       let products = await getProduct(pId);
//       let currentCount;
//       let totalcount = products[0].quantity;
//       if (cartPresent.length > 0) {
//         let prevCartItems = cartPresent[0].cartItems;
//         prevCartItems.forEach((p) => {
//           if (p.pId == pId) {
//             if (chk == 1) {
//               p.quantity++;
//               totalcount--;
//               currentCount = p.quantity;
//             }
//             else if (chk == 2) {
//               if (p.quantity > 1) {
//                 p.quantity--;
//                 totalcount++;
//                 currentCount = p.quantity;
//               }
//             }
//           }
//         })
//         let result = await CartSchemaModel.updateOne({ userid: tofind }, { $set: { cartItems: prevCartItems } })
//       }
//       res.redirect('/cart')
//     }
//     else {
//       res.redirect('/login');
//     }
// }

// async function searchCart(req,res){
//   let tofind = await getUser(req);
//   let cartPresent = await getCartProducts(tofind)
//   let cartProducts = cartPresent[0].cartItems;
//   let result = [];
//   cartProducts.forEach((p)=>{
//     if(p.pname==req.body.value)
//     {
//       result.push(p);
//     }
//   })

//   res.send(result)
// }

// async function checkout(req,res){
//   if (req.session.isLogIn) {
//       let finalOrderList = [];
//       let user = {
//         name: req.session.name,
//         email: req.session.email,
//         username: req.session.username,
//         phone: req.session.phone,
//         isAdmin:req.session.isAdmin
//       }
//       let tofind = await getUser(req);
//       let cartPresent = await getCartProducts(tofind)
//       let products = await getAllProducts();
//       let cartProducts = cartPresent[0].cartItems;
//       if(cartProducts.length>0)
//       {
//         cartProducts.forEach((e)=>{
//           if(e.isForOrder)
//           {
//             for(let i = 0;i<products.length;i++)
//             {
//               if(products[i].id==e.pId)
//               {
//                 if(products[i].quantity-e.quantity>0)
//                 {
//                   let updatePro = {
//                     name:products[i].name,
//                     image:products[i].image,
//                     quantity:e.quantity,
//                     details:products[i].details,
//                     price:products[i].price
  
//                   }
//                   finalOrderList.push(updatePro);
//                 }
//                 break;
//               }
//             }
//           }
//         })
//       }
//       if (finalOrderList.length) {
//         res.render('checkout', { name: JSON.stringify(user), products: finalOrderList })
//       }
//       else {
//         res.render('checkout', { name: JSON.stringify(user), products: [] })
//       }
//     }
//     else {
//       res.redirect('/login');
//     }
// }
}

// ====================================================== SQL Code =========================================================


async function showcart(req, res) {
  if (req.session.isLogIn) {
    let user = {
      name: req.session.name,
      email: req.session.email,
      isAdmin: req.session.isAdmin,
      isSeller: req.session.isSeller
    }
    let cartItems = await getCartItems(req.session.email)
    let cartProducts = [];
    if (cartItems.length > 0) {
      cartItems.forEach(item => {
        let prod = {
          name: item.name,
          price: item.price,
          quantity: item.quant,
          image: item.image,
          prod_id: item.prod_id,
          prod_quant:item.quantity
        }
        cartProducts.push(prod);
      })
    }
    res.render('cart', { name: JSON.stringify(user), products: cartProducts })
  }
  else {
    res.redirect('/auth/login');
  }
}

async function addtocart(req, res) {
  if (req.session.isLogIn) {
    const productId = req.params.pId;
    const email = req.session.email;
    let isPresent = await checkProd(productId,req.session.email);
    if (isPresent.length > 0) 
    {
      let quantity = isPresent[0].quantity
      cartMethods(2, productId, email, quantity);
    }
    else 
    {
      // Insert product into cart_item table
      cartMethods(1, productId, email);
    }
    res.redirect('/cart');
  }
  else {
    res.redirect('/auth/login')
  }
}

async function increase(req, res) {
  if (req.session.isLogIn) {
    let pId = req.body.pId;
    let chk = req.body.check;
    if (chk == 1) {
      cartMethods(chk, pId, req.session.email, req.body.quantity - 1);
      res.send("Done")
    }
    else if (!req.body.isOne) {
      cartMethods(chk, pId, req.session.email);
      res.send("Done")
    }
  }
  else {
    res.redirect('/auth/login');
  }
}

async function searchCart(req, res) {
  let value = req.body.value;
  let result = await cartMethods(5, value, req.session.email);
  let final = [];
  result.forEach((r) => {
    if (value.toLowerCase() == r.name.toLowerCase()) {
      final.push({ name: r.name, quantity: r.quant, price: r.price, image: r.image, prod_id: r.prod_id, prod_quant:r.quantity });
    }
  })
  res.send(final)
}

async function checkout(req,res){
  if (req.session.isLogIn) {
      let user = {
        name: req.session.name,
        email: req.session.email,
        isAdmin:req.session.isAdmin,
        isSeller:req.session.iseller
      }
      let cartItems = await getCartItems(req.session.email);
      let userAdd = await getUserAdd(req.session.email);
      let err = []
      cartItems.forEach((cartItem) => {
        if(cartItem.quant>cartItem.quantity)
        {
          err.push(cartItem);
        }
      })
      if (cartItems.length) {
        if(userAdd.length==0)
        {
          let user =[{street1:"",street2:"",city:"",state:"",pincode:"",phone:""}];
          res.render('checkout', { name: JSON.stringify(user), products: cartItems, err:err,add:user })
        }
        else
        {
          res.render('checkout', { name: JSON.stringify(user), products: cartItems, err:err,add:userAdd })
        }
      }
      else {
        res.redirect('/cart')
      }
    }
    else {
      res.redirect('/auth/login');
    }
}

module.exports = { showcart, addtocart, increase, searchCart, checkout}