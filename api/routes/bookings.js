const { authJwt } = require("../middleware");
const controller = require("../controllers/bookings");

module.exports = function (app) {
    app.post("/api/bookings/add",[authJwt.verifyToken], controller.addNewBooking);
    app.post("/api/bookings/findAll", [authJwt.verifyToken], controller.findBookings);
    app.put("/api/bookings/update/:id", [authJwt.verifyToken], controller.updateBookingById);

};