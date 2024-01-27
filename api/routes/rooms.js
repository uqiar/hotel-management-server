const { authJwt } = require("../middleware");
const controller = require("../controllers/rooms");

module.exports = function (app) {
    app.post("/api/room/add",[authJwt.verifyToken], controller.addNewRoom);
    app.get("/api/room/findAll", [authJwt.verifyToken], controller.findAllRooms);
    app.get("/api/room/availableCount", [authJwt.verifyToken], controller.findAvailableNumbersOfRoom);

};