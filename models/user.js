const mongoose = require('mongoose')

//create schema
const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength:50
    },
    lastname: {
        type:String,
        maxlength: 50
    },
    email: {
        type:String,
        trim:true,
        unique: 1
    },
    password: {
        type:String,
        minlength:6
    },
    role: {
        type:Number,
        default:0
    },
    token: {
        type: String,
    },
    tokenExp: {
        type: Number
    }
})
//create the model => first = name of the collection we wanna create 'User' and 2nd => schema stored in 'User'
const User = mongoose.model('User', userSchema)

module.exports = { User }