const pool = require('../DbConnect/conSql')
module.exports = async function(email){
    try{

        const [products,fields] = await pool.query(`select product_table.*, cart_item.* from cart_item inner join product_table on product_table.prod_id = cart_item.product_id where buyer_id = '${email}' and isAvailable = 1`);
        return products;
    }
    catch(err)
    {
        console.log("There is a error Developer in connecting to database",err)
        res.send("404");
    }
    
}