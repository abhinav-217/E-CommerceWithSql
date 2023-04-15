const pool = require('../DbConnect/conSql')

module.exports = async function(product){
    const qry = `update product_table
                 set name = '${product.name}',price = '${product.price}',description = '${product.description}',quantity = '${product.quantity}'
                 where prod_id = '${product.id}'`

    pool.query(qry).then(([data,fields]) => {
        // console.log("Done Updating");
        return 1;
      })
      .catch((err) =>{
        console.log("Error Occured Developer: ",err)
        return 0;
      })
}