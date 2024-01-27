const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ModalSchema = mongoose.Schema({
    startDate: {
        type: Date,
        required:true,
    },
    endDate: {
        type: Date,
        required:true,
    },
    noOfPeople: {
        type: Number,
        required:true,
    },
    name: {
        type: String,
        required:true,
    },
    email: {
        type: String,
        required:true,
    },
    document: {
        type: String,
        required:true,
    },
    paymentType: {
        type: String,
        enum: ['Cash','Credit Card','Check'],
        default: 'Cash'
    },
    status: {
        type: String,
        enum: ['CHECKED_OUT','CHECK_IN','CONFIRMED','STAYING'],
        default: 'CHECK_IN'
    },
    room: {
        type: Schema.Types.ObjectId,
        ref: 'room',
        require: 1
    },


},
    { timestamps: true }
)

const Booking = mongoose.model('booking', ModalSchema);

module.exports =Booking;


