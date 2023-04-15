const pool = require('../DbConnect/conSql')
module.exports = async function(page,totalproducts){
    try{

        const [products,fields] = await pool.query('select * from product_table inner join seller on product_table.seller_id = seller.seller_id where isAvailable = 1 LIMIT ?,?',[page,totalproducts]);
        return products;
    }
    catch(err)
    {
        console.log("There is a error Developer in connecting to database",err)
        res.send("404");
    }
    
}