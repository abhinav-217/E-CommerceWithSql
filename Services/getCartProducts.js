const CartSchemaModel = require('../Schema/Cart')
module.exports = async function(tofind)
{
    const cartPresent = await CartSchemaModel.find({ userid: tofind });
    return cartPresent;
}