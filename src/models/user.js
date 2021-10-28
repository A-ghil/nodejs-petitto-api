const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: String,
    photo: String,
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: String,
    phone: String,
}, {
    timestamps: true
})

module.exports = mongoose.model('User', UserSchema);
