const { authJwt } = require("../middleware");
const controller = require("../controllers/user");

module.exports = function (app) {
    app.post("/api/user/register", controller.registerNewUser);
    app.post("/api/user/login", controller.login);
    app.get("/api/user/findAll", [authJwt.verifyToken], controller.findAll);
    app.put("/api/user/update/:id", [authJwt.verifyToken], controller.updateRecord);
};
