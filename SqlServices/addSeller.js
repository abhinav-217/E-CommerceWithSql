const pool = require('../DbConnect/conSql')

module.exports = async function(email,company){
    const qry = `INSERT INTO seller (seller_id,company_name) VALUES 
    ('${email}','${company}')`;

    pool.query(qry).then(([data,fields]) => {
      })
      .catch((err) =>{
        console.log("Error Occured Developer: ",err)
      })
}