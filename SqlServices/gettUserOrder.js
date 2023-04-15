const pool = require('../DbConnect/conSql')

module.exports = async function getUserOrders(email)
{
    try{
        let [result,field] = await pool.query(`select * from order_details inner join product_table on order_details.product_id = product_table.prod_id where buyer_id = '${email}'`);
        return result;
    }
    catch(err)
    {
        console.log("There is a Error Developer: ",err)
    }
}