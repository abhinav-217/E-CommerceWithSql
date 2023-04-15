const util = require('util')
const pool = require('../DbConnect/conSql')

module.exports = async function(email){
    const qry = `update user set isVerified = 1 where email = '${email}'`

    pool.query(qry).then(([data,fields]) => {
        // console.log("Done Updating");
      })
      .catch((err) =>{
        console.log("Error Occured Developer: ",err)
      })
}