const router = require("express").Router({ mergeParams: true });
const controller = require("./uses.controller");
const notAllowed = require("../errors/notAllowed");

router.route("/").get(controller.list).all(notAllowed);

router
  .route("/:useId")
  .get(controller.read)
  .delete(controller.delete)
  .all(notAllowed);

module.exports = router;
