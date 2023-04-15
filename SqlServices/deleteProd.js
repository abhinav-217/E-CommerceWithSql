const pool = require('../DbConnect/conSql')

module.exports = async function(id){
    const qry = ` update product_table 
                  set isAvailable = 0
                  where prod_id = '${id}'`

    pool.query(qry).then(([data,fields]) => {
        return 1;
      })
      .catch((err) =>{
        console.log("Error Occured Developer: ",err)
        return 0;
      })
}