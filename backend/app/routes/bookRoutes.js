module.exports = (app) => {
  const books = require("../controllers/bookController.js");

  var router = require("express").Router();

  // Retrieve all Books
  router.get("/", books.findAll);

  // Create new Book
  router.post("/", books.create);

  // Retrieve a single book with id
  router.get("/:id", books.findOne);

  // Update a book with id
  router.put("/:id", books.update);

  // Delete a book with id
  router.delete("/:id", books.delete);

  app.use("/api/books", router);
};
