module.exports = (app) => {
  const editions = require("../controllers/editionController.js");

  var router = require("express").Router();

  // Retrieve all Editions
  router.get("/", editions.findAll);

  // Create new Edition
  router.post("/", editions.create);

  // Retrieve a single edition with id
  router.get("/:id", editions.findOne);

  // Update a edition with id
  router.put("/:id", editions.update);

  // Delete an edition with id
  router.delete("/:id", editions.delete);

  app.use("/api/editions", router);
};
