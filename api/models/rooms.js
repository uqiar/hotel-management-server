const mongoose = require('mongoose');
const Schema = mongoose.Schema({
    roomNo: {
        type: String,
        required:true,
        unique: 1,
    },
    roomType: {
        type: String,
        enum: ['Standard Room', 'Deluxe Room','Suite','Family Room'],
        default: 'Standard Room'
    },
    bedType: {
        type: String,
        required:true,
        num: ['King Bed','Queen Bed','Double Bed','Single Bed'],
        default: 'Single Bed'
    },
    amenities: {
        type: Array
    },
    price: {
        type: Number,
        required:true,
    },
    isAvailable: {
        type: Boolean,
        default: true
       
    },
    notes: {
        type: String,
       
    }

},
    { timestamps: true }
)

const Rooms = mongoose.model('room', Schema);

module.exports = Rooms;


