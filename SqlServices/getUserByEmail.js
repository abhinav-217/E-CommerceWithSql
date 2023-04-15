const pool = require('../DbConnect/conSql')
module.exports = async function(email){
    const [user,fields] = await pool.query(`select * from user where email = '${email}'`);
    return user;
}