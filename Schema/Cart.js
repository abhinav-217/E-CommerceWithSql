const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema ({
    userid:String,
    cartItems:[
        {
            "pId": Number,
            "pname": String,
            "price": Number,
            "image": String,
            "quantity": Number,
            "isForOrder": Boolean
        }
    ]
})

const CartSchemaModel = mongoose.model('Cart',CartSchema);
module.exports = CartSchemaModel;