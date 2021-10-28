const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const PetSchema = new mongoose.Schema({
    name: String,
    age: String,
    gender: String,
    breed: String,
    species: String,
    photo: String,
    petDonor: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    adopted: {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        date: Date
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Pet', PetSchema)