
const Staff = require('../models/staff');

exports.addNewStaff= async (req, res) => {
    try {
        var data = req.body;
        const staff = new Staff(data)
        var doc = await staff.save()
        res.status(200).json(doc)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

exports.findAllStaff = async (req, res) => {
    try {
        var doc = await Staff.find()
        res.status(200).json(doc)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}