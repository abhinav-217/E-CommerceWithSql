const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema ({
    name:String,
    username:String,
    email:String,
    phone:Number,
    password:String,
    otp:Number,
    isVerified:Boolean,
    isAdmin:Boolean
})

const UserSchemaModel = mongoose.model('User',UserSchema);
module.exports = UserSchemaModel;