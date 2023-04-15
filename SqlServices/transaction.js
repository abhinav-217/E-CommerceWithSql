const pool = require('../DbConnect/conSql')
module.exports = async function(cart,address,price,email,payment_type,callback){
    try
    {
        const date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let order_date = `${day}-${month}-${year}`;
        let delivery_date = `27-12-20023`;
        await pool.query('START TRANSACTION')
        for(let i = 0;i<cart.length;i++) {
            if(cart[i].inStock)
            {
                await pool.query(`INSERT INTO order_details(buyer_id,product_id, price, order_date, order_status, quant, delievery_date, delievery_address_id, payment_type, total_price)
                VALUES ('${email}',${cart[i].prod_id},${cart[i].price},'${order_date}','To be Delievered','${cart[i].quant}','${delivery_date}','${address[0].Address_id}','${payment_type}', '${cart[i].quant * cart[i].price}')`)
                if(parseInt(cart[i].quantity) - parseInt(cart[i].quant)>=0)
                {
                    let update = parseInt(cart[i].quantity) - parseInt(cart[i].quant);
                    await pool.query(`UPDATE product_table SET quantity = ${update} WHERE prod_id = ${cart[i].prod_id}`)
                   
                }
                await pool.query(`DELETE FROM cart_item WHERE product_id = ${cart[i].prod_id} and buyer_id = '${email}'`)
                // console.log("From if");
            }
            else
            {
                await pool.query(`DELETE FROM cart_item WHERE product_id = ${cart[i].prod_id} and buyer_id = '${email}'`)
                // console.log("From Else");
            }
        }
        pool.query('COMMIT');
        callback(1,cart);
        
    }
    catch(err)
    {
        console.log(err);
        pool.query('ROLLBACK');
        callback(0,cart)
    }
    
}