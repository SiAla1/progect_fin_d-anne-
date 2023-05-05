const Author = require("../models/authorModel.js");

exports.findAll = (req, res) => {
  Author.getAll([], (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving authors.",
      });
    else res.send(data);
  });
};

exports.create = (req, res) => {
  //Create a Author
  const author = new Author(req.body);

  // Save Author in the database
  Author.create(author, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the author.",
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Author.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found author with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving author with id " + req.params.id,
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

  Author.updateById(req.params.id, new Author(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found author with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating author with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  Author.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found author with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete author with id " + req.params.id,
        });
      }
    } else res.send({ message: `Author was deleted successfully!` });
  });
};
