const getProductDb = require('../DbConnect/getProductDb')

module.exports = async function () {
    let data = await getProductDb();
    let products = await data.find().toArray();
    return products;
}