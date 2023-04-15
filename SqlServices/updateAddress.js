const pool = require('../DbConnect/conSql')

module.exports = async function (chk, address, email,id) {
    let street1 = address.street1.replace(/["']/g, "");
    let street2 = address.street2.replace(/["']/g, "");
    if (chk == 1) {
        const qry = `INSERT INTO user_details (user_id,phone,street1,street2,city,state,pincode) VALUES 
        ('${email}','${address.phone}','${street1}','${street2}','${address.city}','${address.state}','${address.pincode}')`;
        try {
            const [update, fields] = await pool.query(qry)
            if (update.affectedRows == 1) {
                return 1;
            }
        }
        catch (err) {
            console.log(err);
            return 0;
        }
    }
    else if (chk == 2) {
        // console.log("The address id is: ",id)
        // console.log(address.phone)
        const qry = `update user_details
        set phone = '${address.phone}',street1 = '${street1}',street2 = '${street2}',city = '${address.city}',state = '${address.state}',pincode = '${address.pincode}'
        where Address_id = '${parseInt(id)}'`
        // console.log("Updating the address");
        try {
            const [update, fields] = await pool.query(qry)
            if (update.affectedRows == 1) {
                return 1;
            }
        }
        catch (err) {
            console.log(err);
            return 0;
        }
    }
}