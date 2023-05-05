module.exports = (app) => {
  const categories = require("../controllers/categoryController.js");

  var router = require("express").Router();

  // Retrieve all Categories
  router.get("/", categories.findAll);

  // Create new Category
  router.post("/", categories.create);

  // Retrieve a single category with id
  router.get("/:id", categories.findOne);

  // Update a category with id
  router.put("/:id", categories.update);

  // Delete a category with id
  router.delete("/:id", categories.delete);

  app.use("/api/categories", router);
};
