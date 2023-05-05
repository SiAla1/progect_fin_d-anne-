const Book = require("../models/bookModel.js");

// Retrieve all Books from the database (with condition).
exports.findAll = (req, res) => {
  const { title, author, category, edition } = req.query;

  Book.getAll(title, author, category, edition, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving books.",
      });
    else res.send(data);
  });
};

exports.create = (req, res) => {
  //Create a Book
  const book = new Book({
    title: req.body.title,
    authorId: req.body.authorId,
    categoryId: req.body.categoryId,
    editionId: req.body.editionId,
    language: req.body.language,
  });

  // Save Book in the database
  Book.create(book, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the book.",
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Book.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found book with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving book with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  console.log(req.body);

  Book.updateById(req.params.id, new Book(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found book with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating book with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  Book.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found book with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete book with id " + req.params.id,
        });
      }
    } else res.send({ message: `Book was deleted successfully!` });
  });
};