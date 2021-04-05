const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    createdAt:{ 
        type: Date, 
        required: true, 
        default: Date.now 
    }
    
})

const User = mongoose.model('User', UserSchema);

module.exports = User;