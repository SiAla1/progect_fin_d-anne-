const sql = require("./db.js");

// constructor
const Author = function (author) {
  this.authorName = author.authorName;
  this.birthDate = author.birthDate;
  this.deathDate = author.deathDate;
  this.isInspector = author.isInspector;
};

Author.getAll = ([], result) => {
  let query = "SELECT * FROM Authors ORDER BY id";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("authors: ", res);
    result(null, res);
  });
};

Author.create = (newAuthor, result) => {
  sql.query("INSERT INTO authors SET ?", newAuthor, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created author: ", { id: res.insertId, ...newAuthor });
    result(null, { id: res.insertId, ...newAuthor });
  });
};

Author.findById = (id, result) => {
  sql.query(`SELECT * FROM authors WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found author: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found author with the id
    result({ kind: "not_found" }, null);
  });
};

Author.updateById = (id, author, result) => {
  sql.query(
    "UPDATE authors " +
      "SET authorName = ?, birthDate = ?, deathDate = ?, isInspector = ? " +
      "WHERE id = ?",
    [
      author.authorName,
      author.birthDate,
      author.deathDate,
      author.isInspector,
      id,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found author with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated author: ", { id: id, ...author });
      result(null, { id: id, ...author });
    }
  );
};

Author.remove = (id, result) => {
  sql.query("DELETE FROM authors WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found author with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted author with id: ", id);
    result(null, res);
  });
};

module.exports = Author;
