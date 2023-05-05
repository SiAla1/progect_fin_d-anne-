module.exports = (app) => {
    const userNV = require("../controllers/userNVController.js");

    var router = require("express").Router();

    // Retrieve all UserNV
    router.get("/", userNV.findAll);

    // Create new Author
    router.post("/", userNV.create);

    // Retrieve a single author with id
    router.get("/:id", userNV.findOne);

    // Update an author with id
    // router.put("/:id",  userNV.update );

    // Delete an author with id
    router.delete("/:id", userNV.delete);

    app.use("/api/UserNV", router);
};
