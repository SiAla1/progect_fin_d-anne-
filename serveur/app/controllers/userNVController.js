const UserNV = require("../models/userNVModel.js");

exports.findAll = (req, res) => {
    UserNV.getAll([], (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving users.",
            });
        else res.send(data);
    });
};

exports.create = (req, res) => {
    //Create a Author
    const userNV = new UserNV(req.body);

    // Save Author in the database
    UserNV.create(userNV, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the user.",
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    UserNV.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found user with id ${req.params.id}.`,
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving user with id " + req.params.id,
                });
            }
        } else res.send(data);
    });
};

// exports.update = (req, res) => {
//     // Validate Request
//     if (!req.body) {
//         res.status(400).send({
//             message: "Content can not be empty!",
//         });
//     }

//     console.log(req.body);

//     UserNV.updateById(req.params.id, new UserNV(req.body), (err, data) => {
//         if (err) {
//             if (err.kind === "not_found") {
//                 res.status(404).send({
//                     message: `Not found user with id ${req.params.id}.`,
//                 });
//             } else {
//                 res.status(500).send({
//                     message: "Error updating user with id " + req.params.id,
//                 });
//             }
//         } else res.send(data);
//     });
// };

exports.delete = (req, res) => {
    UserNV.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found user with id ${req.params.id}.`,
                });
            } else {
                res.status(500).send({
                    message: "Could not delete user with id " + req.params.id,
                });
            }
        } else res.send({ message: `user was deleted successfully!` });
    });
};
