const UserSchemaModel = require('../Schema/User')
const sendEmail = require('../methods/sendEmail')
const getUser = require('../SqlServices/getUserByEmail');
const pool = require('../DbConnect/conSql')
const insertUser = require('../SqlServices/insertuser')
const updatUser = require('../SqlServices/updateverify');
const updatePassword = require('../SqlServices/updatePass')
const addSeller = require('../SqlServices/addSeller')
async function render_signup(req, res) {
//Rendering the sign up page
  if (req.session.isLogIn) {
    res.redirect('/')
  }
  else {
    res.render('signup.ejs', { err: "" })
  }
}

// ====================================== Mongo DB ========================================= 

// async function checkSignup(req, res) {
//     let otp = parseInt(Math.random() * 1000000);
//     let Thisuser = {
//       name: req.body.name,
//       username: req.body.username,
//       email: req.body.email,
//       phone: req.body.phone,
//       password: req.body.password
//     }
//     const isPresent = await UserSchemaModel.find({ email: Thisuser.email })
//     if (isPresent.length) {
//       res.render('signup.ejs', { err: "Email already exist" })
//     }
//     else {
//       sendEmail(Thisuser.email, otp, "Verify Your Email", (err, data) => {
//         if (err) {
//           res.render('signup', { err: 'Something Went Wrong!! Try Again' })
//           return;
//         }
//       })
//       const user = new UserSchemaModel();
//       user.name = Thisuser.name;
//       user.username = Thisuser.username;
//       user.email = Thisuser.email;
//       user.phone = Thisuser.phone;
//       user.password = Thisuser.password;
//       user.otp = otp;
//       user.isVerified = false;
//       user.isAdmin = false;
//       let savedUser = user.save();
//       req.session.name = Thisuser.name;
//       req.session.username = Thisuser.username;
//       req.session.email = Thisuser.email;
//       req.session.phone = Thisuser.phone;
//       req.session.otp = otp;
//       console.log(otp)
//       res.redirect('/verify')
//     }
// }

// async function verifyUser(req,res)
// {
//     if (req.session.isLogIn) {
//         redirect('/');
//         return;
//       }
//       let enteredOtp = parseInt(req.body.otp);
//       const isPresent = await UserSchemaModel.find({ email: req.session.email })
//       let originalOtp = isPresent[0].otp;
//       let _id = isPresent[0]._id.valueOf();
//       if (parseInt(enteredOtp) == parseInt(originalOtp)) {
//         let result = await UserSchemaModel.updateOne({ _id: _id }, { $set: { isVerified: true } })
//         req.session.isLogIn = true;
//         res.redirect("/")
//       }
//       else {
//         res.render('signup', { err: 'OTP Does Not match Try again' })
//         return;
//       }
// }

// async function checkLogin(req, res) {
//   const isPresent = await UserSchemaModel.find({ email: req.body.email })
//   if (isPresent.length > 0) {
//     if (isPresent[0].isVerified) {
//       if (isPresent[0].password == req.body.password) {
//         req.session.name = isPresent[0].name;
//         req.session.username = isPresent[0].username;
//         req.session.email = isPresent[0].email;
//         req.session.phone = isPresent[0].phone;
//         req.session.isLogIn = true;
//         if (isPresent[0].isAdmin) {
//           req.session.isAdmin = true;
//         }
//         else {
//           req.session.isAdmin = false;
//         }
//         res.redirect('/');
//       }
//       else {
//         res.render('login.ejs', { err: "Incorrect Password" })
//       }
//     }
//     else {
//       req.session.name = isPresent[0].name;
//       req.session.username = isPresent[0].username;
//       req.session.email = isPresent[0].email;
//       req.session.phone = isPresent[0].phone;
//       res.redirect('/verify');
//     }
//   }
//   else {
//     res.render('login.ejs', { err: "Not matching email Try Signing In!!!" })
//   }
// }

// async function render_reset(req,res){
//   if (req.session.isLogIn) {
//       let user = {
//         name: req.session.name,
//         username: req.session.username,
//         phone: req.session.phone,
//         email: req.session.email,
//       }
//       res.render('reset', { name: JSON.stringify(user), err: "" })
//     }
//     else if (req.session.forVerify) {
//       const isPresent = await UserSchemaModel.find({ email: req.session.email })
//       req.session.name = isPresent[0].name;
//       req.session.email = isPresent[0].email;
//       req.session.phone = isPresent[0].phone;
//       req.session.username = isPresent[0].username;

//       res.render('reset', { name: JSON.stringify({}), err: "" })
//     }
//     else {
//       res.redirect('/login')
//     }
// }

// async function resetPassword(req,res)
// {
//   let newPass = req.body.new;
//   let confirm = req.body.confirm;
//   let email = req.session.email;
//   if (newPass == confirm) {
//     let result = await UserSchemaModel.updateOne({ email: email }, { $set: { password: newPass } })
//     req.session.isLogIn = true;
//     res.redirect("/")
//   }
//   else {
//     let user = {
//       name: req.session.name,
//       username: req.session.username,
//       phone: req.session.phone,
//       email: req.session.email,
//     }
//     res.render('reset', { name: JSON.stringify(user), err: "Password's Do not match" })
//   }
// }

// ====================================== SQL Code ======================================== 
async function checkSignup(req, res) {
  //Processing the signup page
  let otp = parseInt(Math.random() * 1000000);
  let Thisuser = {
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    otp: otp,
    role: 0,
    isVerified: 0
  }
  let flag = false;
  if (req.body.sellercompany.length > 0) {
    Thisuser.role = 1;
    flag = true;
  }
  const users = await getUser(Thisuser.email)
  if (users.length) {
    res.render('signup.ejs', { err: "Email already exist" })
  }
  else {
    sendEmail(Thisuser.email, otp, "Verify Your Email", (err, data) => {
      if (err) {
        res.render('signup', { err: 'Something Went Wrong!! Try Again' })
        return;
      }
    })
    insertUser(Thisuser)
    req.session.name = Thisuser.name;
    req.session.username = Thisuser.username;
    req.session.email = Thisuser.email;
    req.session.phone = Thisuser.phone;
    req.session.otp = otp;
    if (flag) {
      req.session.isSeller = true;
      //TO UPDATE SELLER TABLE
      addSeller(Thisuser.email, req.body.sellercompany)
    }
    res.redirect('/auth/verify')
  }
}

async function render_verify(req, res) {
  // rendering the verify page
  if (req.session.isLogIn) {
    res.redirect('/')
    return;
  }
  res.render('verify')
}


async function verifyUser(req, res) {
  //Verifying the user
  if (req.session.isLogIn) {
    redirect('/');
    return;
  }
  let enteredOtp = parseInt(req.body.otp);
  // console.log(enteredOtp)
  let user = await getUser(req.session.email)
  let originalOtp = user[0].otp;
  if (parseInt(enteredOtp) == parseInt(originalOtp)) {

    req.session.isLogIn = true;
    req.session.name = user[0].Name;
    updatUser(req.session.email)
    res.redirect("/")
  }
  else {
    res.render('signup', { err: 'OTP Does Not match Try again' })
    return;
  }
}

async function render_login(req, res) {
  //Rendering the login page 
  if (req.session.isLogIn) {
    res.redirect('/')
  }
  else {
    res.render('login.ejs', { err: "" })
  }
}


async function checkLogin(req, res) {
  //Processing the login of user
  const isPresent = await getUser(req.body.email);
  if (isPresent.length > 0) {
    if (isPresent[0].isVerified) {
      if (isPresent[0].password == req.body.password) {
        req.session.name = isPresent[0].Name;
        req.session.email = isPresent[0].email;
        req.session.isLogIn = true;
        if (isPresent[0].role == 2) {
          req.session.isAdmin = true;
        }
        else if (isPresent[0].role == 1) {
          req.session.isSeller = true;
          // console.log(req.session.isSeller)
        }
        else if (isPresent[0].role == 0) {
          req.session.isUser = true;
        }
        res.redirect('/');
      }
      else {
        res.render('login.ejs', { err: "Incorrect Password" })
      }
    }
    else {
      req.session.name = isPresent[0].Name;
      req.session.email = isPresent[0].email;
      res.render('verify')
    }
  }
  else {
    res.render('login.ejs', { err: "Not matching email Try Signing In!!!" })
  }
}

async function logout(req, res) {
  req.session.destroy();
  res.redirect("/")
}

async function render_forgot(req, res) {
  if (req.session.isLogIn) {
    res.redirect('/');
    return;
  }
  res.render('forgot', { name: "" });
}

async function forgot(req, res) {
  let email = req.body.email;
  let otp = parseInt(Math.random() * 1000000);
  sendEmail(email, otp, "Forgot Password Otp", (err, data) => {
    if (err) {
      res.render('login', { err: 'Something Went Wrong!! Try Again' })
      return;
    }
  })
  req.session.otpVerify = otp;
  req.session.email = email;
  res.redirect('/auth/verifyF');
}

async function render_verifyF(req, res) {
  if (req.session.isLogIn) {
    res.redirect('/');
    return;
  }
  res.render('forgotVerify')
}

async function checkVerifyf(req, res) {
  let otp = parseInt(req.body.otp)
  // console.log(otp)
  if (otp == parseInt(req.session.otpVerify)) {
    req.session.forVerify = true;
    res.redirect('reset')
  }
  else {
    res.redirect('/auth/verifyF');
  }
}


async function render_reset(req, res) {
  if (req.session.isLogIn) {
    let user = {
      name: req.session.name,
      username: req.session.username,
      phone: req.session.phone,
      email: req.session.email,
    }
    res.render('reset', { name: JSON.stringify(user), err: "" })
  }
  else if (req.session.forVerify) {
    const isPresent = await getUser(req.session.email)
    req.session.name = isPresent[0].Name;
    req.session.email = isPresent[0].email;
    res.render('reset', { name: JSON.stringify({}), err: "" })
  }
  else {
    res.redirect('/auth/login')
  }
}

async function resetPassword(req, res) {
  let newPass = req.body.new;
  let confirm = req.body.confirm;
  let email = req.session.email;
  if (newPass == confirm) {
    let result = await updatePassword(email, newPass)
    req.session.isLogIn = true;
    res.redirect("/")
  }
  else {
    let user = {
      name: req.session.name,
      username: req.session.username,
      phone: req.session.phone,
      email: req.session.email,
    }
    res.render('reset', { name: JSON.stringify(user), err: "Password's Do not match" })
  }
}


module.exports = { render_signup, checkSignup, verifyUser, render_verify, render_login, checkLogin, logout, render_forgot, forgot, render_verifyF, checkVerifyf, render_reset, resetPassword }