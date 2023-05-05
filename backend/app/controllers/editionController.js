const Edition = require("../models/editionModel.js");

exports.findAll = (req, res) => {
  Edition.getAll([], (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving editions.",
      });
    else res.send(data);
  });
};

exports.create = (req, res) => {

  //Create a Edition
  const edition = new Edition(req.body);

  // Save Edition in the database
  Edition.create(edition, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the edition.",
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Edition.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found edition with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving edition with id " + req.params.id,
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

  Edition.updateById(req.params.id, new Edition(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found edition with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating edition with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  Edition.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found edition with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete edition with id " + req.params.id,
        });
      }
    } else res.send({ message: `Edition was deleted successfully!` });
  });
};
