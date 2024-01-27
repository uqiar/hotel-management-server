const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: 1,
    },
    password: {
        type: String
    },
    image: {
        type: String
    },
    language: {
        type: String,
        enum: ['english', 'urdu'],
        default: 'english'
    }

},
    { timestamps: true }
)

const Users = mongoose.model('user', userSchema);

module.exports = Users;


