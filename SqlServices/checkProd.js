const pool = require('../DbConnect/conSql')
module.exports = async function(id,email){
    try{

        const [products,fields] = await pool.query(`select * from cart_item where product_id = ${id} and buyer_id = '${email}'`);
        return products;
    }
    catch(err)
    {
        console.log("There is a error Developer in connecting to database \n",err)
        res.send("404");
    }
    
}