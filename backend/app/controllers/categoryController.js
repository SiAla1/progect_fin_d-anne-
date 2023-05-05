const Category = require("../models/categoryModel.js");

exports.findAll = (req, res) => {
  Category.getAll([], (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving categories.",
      });
    else res.send(data);
  });
};

exports.create = (req, res) => {
  //Create a Category
  const category = new Category(req.body);

  // Save Category in the database
  Category.create(category, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the category.",
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Category.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found category with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving category with id " + req.params.id,
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

  Category.updateById(req.params.id, new Category(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found category with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating category with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  Category.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found category with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete category with id " + req.params.id,
        });
      }
    } else res.send({ message: `Category was deleted successfully!` });
  });
};
