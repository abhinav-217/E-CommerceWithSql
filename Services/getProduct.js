const getProductDb = require('../DbConnect/getProductDb')

module.exports = async function (productId){
    let data = await getProductDb();
    let products = await data.find({ id: parseInt(productId) }).toArray();
    return products;
}