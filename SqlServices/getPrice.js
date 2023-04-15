const pool = require('../DbConnect/conSql')

module.exports = async function (email){
    try{
        const [result,field] = await pool.query(`select * from cart_item inner join product_table on product_table.prod_id = cart_item.product_id where buyer_id = '${email}'`)
        let sum = 0;
        result.forEach(item =>{
            sum += item.price * item.quant;
        })
        // console.log(sum);
        return sum;
    }
    catch(err){
        console.log(err)
        return 1;
    }

}