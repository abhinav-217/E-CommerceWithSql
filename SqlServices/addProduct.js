const util = require('util')
const pool = require('../DbConnect/conSql')

module.exports = async function(product){
    let desc = product.description.replace(/["']/g, "");
    const qry = `INSERT INTO product_table (seller_id,name,price,description,quantity,image,isAvailable) VALUES 
    ('${product.Sid}','${product.name}','${product.price}','${desc}','${product.quantity}','${product.image}',1)`;

    pool.query(qry).then(([data,fields]) => {
    })
    .catch((err) =>{
      console.log("Error Occured Developer: ",err)
    })
}