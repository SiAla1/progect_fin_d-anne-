module.exports = (app) => {
  const authors = require("../controllers/authorController.js");

  var router = require("express").Router();

  // Retrieve all Authors
  router.get("/", authors.findAll);

  // Create new Author
  router.post("/", authors.create);

  // Retrieve a single author with id
  router.get("/:id", authors.findOne);

  // Update an author with id
  router.put("/:id", authors.update);

  // Delete an author with id
  router.delete("/:id", authors.delete);

  app.use("/api/authors", router);
};
