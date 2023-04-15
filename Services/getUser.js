const UserSchemaModel = require('../Schema/User')

module.exports = async function (req)
{
    const userPresent = await UserSchemaModel.find({ email: req.session.email })
    let tofind = userPresent[0]._id.valueOf();
    return tofind;
}