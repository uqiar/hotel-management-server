const mongoose = require('mongoose');
const staffSchema = mongoose.Schema({
    name: {
        type: String,
        required:true,
    },
    position: {
        type: String,
        required:true,
    },
    contact: {
        type: String,
        required:true,
    },
    email: {
        type: String,
        required:true,
    },
    responsibility: {
        type: String,
        required:true,
    },
    emergencyContact: {
        type: String,
        required:true,
    },
    nationality: {
        type: String,
        required:true,
    },

},
    { timestamps: true }
)

const Staff = mongoose.model('staff', staffSchema);

module.exports = Staff;


