const mongoose = require('mongoose')
const url = 'mongodb://127.0.0.1:27017/AbhiDb';

module.exports = async function init()
{
    await mongoose.connect(url);
    console.log("Connected to Database")
}