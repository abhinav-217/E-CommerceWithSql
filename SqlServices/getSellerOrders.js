const pool = require('../DbConnect/conSql')

module.exports = async function (email)
{
    try{
        const [result,fields] = await pool.query(`select * from order_details inner join product_table on product_table.prod_id = order_details.product_id where seller_id = '${email}'`)
        // console.log(result)
        return result;
    }
    catch(err){
        console.log(err)
        return 0;
    }

}