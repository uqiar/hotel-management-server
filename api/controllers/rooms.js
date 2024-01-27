const Rooms = require('../models/rooms');

exports.addNewRoom = async (req, res) => {
    try {
        var data = req.body;
        const rooms = new Rooms(data)
        var doc = await rooms.save()
        res.status(200).json(doc)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

exports.findAllRooms = async (req, res) => {
    try {
        var doc = await Rooms.find()
        res.status(200).json(doc)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}
exports.findAvailableNumbersOfRoom = async (req, res) => {
    try {
        var available = await Rooms.find({isAvailable:true}).count()
        var notAvailable = await Rooms.find({isAvailable:false}).count()
        res.status(200).json({available,notAvailable})
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}