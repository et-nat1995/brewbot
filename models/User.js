const mongoose = require('mongoose')
const Schema = mongoose.Schema

// create Schema 
const UserSchema = new Schema({
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    favorites: {
        type: Array
    },
    date: {
        type: Date,
        default: Date.now
    }
})


module.exports = User = mongoose.model('users', UserSchema)
