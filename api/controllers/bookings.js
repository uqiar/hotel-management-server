const Bookings = require('../models/bookings');
const Rooms = require('../models/rooms');


// Function to randomly select
function getRandomSelect(arr) {
    // Generate a random index
    const randomIndex = Math.floor(Math.random() * arr.length);
    // Return the randomly selected
    return arr[randomIndex];
  }
exports.addNewBooking = async (req, res) => {
    try {
        var data = req.body;
        const findRoom = await Rooms.findOne({ roomType: data.roomType, isAvailable: true })

        if (findRoom) {
            data.room = findRoom._id;
        } else {
            res.status(400).json({ message: "All rooms are booked!" })
            return
        }
        data.status=getRandomSelect(['CHECKED_OUT','CHECK_IN','CONFIRMED','STAYING'])
        await Rooms.findOneAndUpdate({_id:findRoom._id},{isAvailable:data.status=="CHECKED_OUT"?true:false})
        const booking = new Bookings(data)
        var doc = await booking.save()
        res.status(200).json(doc)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}
exports.findBookings = async (req, res) => {
    try {
        var data = req.body;
        let queryObj = {}
        if (data.startDate&&!data.endDate) {
            const startOfDay = new Date(new Date(data.startDate).setUTCHours(0, 0, 0, 0)).toISOString()
            const endOfDay = new Date(new Date(data.startDate).setUTCHours(23, 59, 59, 999)).toISOString()
            queryObj.startDate = {
                $gte: startOfDay, // 2019-11-08T00:00:00.000Z
                $lt: endOfDay // 2019-11-08T23:59:59.999Z
            }
        }
        if (data.startDate&&data.endDate) {
            const startOfDay = new Date(new Date(data.startDate).setUTCHours(0, 0, 0, 0)).toISOString()
            const endOfDay = new Date(new Date(data.endDate).setUTCHours(23, 59, 59, 999)).toISOString()
            queryObj.startDate = {
                $gte: startOfDay
            }
            queryObj.endDate = {
                $lte: endOfDay
            }
        }
        console.log(queryObj)
        var doc = await Bookings.find(queryObj).populate("room")
        res.status(200).json(doc)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

exports.updateBookingById = async (req, res) => {
    try {
       const {startDate,endDate,roomNo}=req.body;
       const findRoomByNo=await Rooms.findOne({roomNo})
       if(!findRoomByNo)
       return res.status(400).json({message:"Something want wrong!"})
       const result=await Bookings.findByIdAndUpdate({_id:req.params.id},{startDate,endDate,room:findRoomByNo._id})
       res.status(200).json(result)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}