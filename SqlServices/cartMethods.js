const pool = require('../DbConnect/conSql')
module.exports = async function (check, id, email, quantity = 1) {
  try {

    if (check == 1) {
      const qry = `INSERT INTO cart_item (product_id, buyer_id, quant) VALUES
            ('${id}', '${email}',1)`
      pool.query(qry).then(([data, fields]) => {
      })
        .catch((err) => {
          console.log("Error Occured Developer: ", err)
        })
    }
    else if (check == 2) {
      const qry = `UPDATE cart_item SET quant = quant+1 WHERE product_id = ${id}`
      pool.query(qry).then(([data, fields]) => {
      })
        .catch((err) => {
          console.log("Error Occured Developer: ", err)
        })
    }
    else if (check == 3) {
      // console.log("For Decreasing the quantity");
      const qry = `UPDATE cart_item SET quant = quant-1 WHERE product_id = ${id}`
      pool.query(qry).then(([data, fields]) => {
      })
        .catch((err) => {
          console.log("Error Occured Developer: ", err)
        })
    }
    else if (check == 4) {
      // console.log("For Deleting the product");
      const qry = `DELETE FROM cart_item WHERE product_id = ${id} and buyer_id = '${email}'`;
      pool.query(qry).then(([data, fields]) => {
      })
        .catch((err) => {
          console.log("Error Occured Developer: ", err)
        })
    }
    else if (check == 5) {
      // console.log("For Calling for searching")
      try {

        const [products, fields] = await pool.query(`select product_table.*, cart_item.* from cart_item inner join product_table on product_table.prod_id = cart_item.product_id where buyer_id = '${email}'`);
        // console.log(products)
        return products;
      }
      catch (err) {
        console.log("There is a error Developer in connecting to database", err)
        res.send("404");
      }
    }
  }
  catch (err) {
    console.log("There is a error Developer in connecting to database", err)
  }

}