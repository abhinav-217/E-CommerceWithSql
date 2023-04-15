const pool = require('../DbConnect/conSql')
module.exports = async function(id){
    try{

        const [products,fields] = await pool.query(`select * from product_table where prod_id = ${id} `);
        return products;
    }
    catch(err)
    {
        console.log("There is a error Developer in connecting to database",err)
        res.send("404");
    }
    
}