const router = require("express").Router();
const controller = require("./urls.controller");
const notAllowed = require("../errors/notAllowed");
const usesRouter = require("../uses/uses.router");

router.use("/:urlId/uses", controller.urlExists, usesRouter);

router.route("/").get(controller.list).post(controller.create).all(notAllowed);

router
  .route("/:urlId")
  .get(controller.read)
  .put(controller.update)
//   .delete(controller.delete)
  .all(notAllowed);

module.exports = router;
