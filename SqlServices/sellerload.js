const pool = require('../DbConnect/conSql')
module.exports = async function(page,totalproducts,email){
    try{
        const statement = `SELECT P.*,S.company_name FROM product_table P inner join seller S on P.seller_id = S.seller_id where P.seller_id = '${email}' and isAvailable = 1 LIMIT ${page},${totalproducts}`;
        const products = await pool.query(statement);
        return products[0];
    }
    catch(err)
    {
        console.log("There is a error Developer in connecting to database",err)
    }
    
}