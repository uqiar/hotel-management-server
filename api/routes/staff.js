const { authJwt } = require("../middleware");
const controller = require("../controllers/staff");

module.exports = function (app) {
    app.post("/api/staff/add",[authJwt.verifyToken], controller.addNewStaff);
    app.get("/api/staff/findAll", [authJwt.verifyToken], controller.findAllStaff);

};