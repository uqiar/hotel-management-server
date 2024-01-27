const User = require('../models/user');
var { encrypt, decrypt } = require('../../utils/helper');
var jwt = require("jsonwebtoken");
const config = require("../config/auth.config");

exports.registerNewUser = async (req, res) => {
    try {
        var data = req.body;
        data.password = encrypt(data.password)
        const user = new User(data)
        var doc = await user.save()
        res.status(200).json(doc)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}


exports.login = async (req, res, next) => {
    try {
        const data = req.body;
        var result = await User.find({ email: data.email })
        if (!result.length) {
            return res.status(404).json({ message: "User Not Found" })
        }
        var decryptedPass = await decrypt(result[0].password);
        if (decryptedPass !== data.password) {
            return res.status(401).json({ message: "Invalid Password" });
        }

        var token = jwt.sign({ id: result[0]._id }, config.secret, {
            expiresIn: config.expiresIn
        });
        res.status(200).json({
            user: result[0],
            accessToken: token
        })
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }

}


exports.findAll = async (req, res, next) => {
    try {
        var result = await User.find()
        res.status(200).json(result)
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }

}

exports.updateRecord = async (req, res) => {
    try {
        var data = req.body;
        var doc = await User.findByIdAndUpdate({ _id: req.params.id }, data)
        res.status(200).json(doc)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}