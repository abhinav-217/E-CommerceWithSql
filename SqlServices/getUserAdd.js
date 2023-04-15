const pool = require('../DbConnect/conSql')
module.exports = async function(email){
    try{
        const [user,fields] = await pool.query(`select * from user_details where user_id = '${email}'`);
        return user;
    }
    catch(err){
        console.log("There is a err Developer in your SQL Syntax Againnnnnnnnn!!!!!!!!!!!!!",err);
    }
}