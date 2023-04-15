const pool = require('../DbConnect/conSql')

module.exports = async function(email,pass){
    const qry = `update user set password = '${pass}' where email = '${email}'`

    pool.query(qry).then(([data,fields]) => {
        // console.log("Done Updating");
      })
      .catch((err) =>{
        console.log("Error Occured Developer: ",err)
      })
}