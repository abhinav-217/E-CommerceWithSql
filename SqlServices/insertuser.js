const util = require('util')
const pool = require('../DbConnect/conSql')

module.exports = async function(Thisuser){
    const qry = `INSERT INTO user (email,password,Name,otp,isVerified,role) VALUES 
    ('${Thisuser.email}','${Thisuser.password}','${Thisuser.name}','${Thisuser.otp}','${Thisuser.isVerified}','${Thisuser.role}')`;

    pool.query(qry).then(([data,fields]) => {
        // console.log(data);
      })
      .catch((err) =>{
        // console.log("Error Occured while inserting",err);
        console.log("Error Occured Developer: ",err)
        // res.render('signup.ejs', { err: "Email already exist" })
      })
}