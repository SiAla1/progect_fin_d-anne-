const sql = require("./db.js");

// constructor
const Edition = function (edition) {
  this.editionName = edition.editionName;
};

Edition.getAll = ([], result) => {
  let query = "SELECT * FROM Editions ORDER BY id";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("editions: ", res);
    result(null, res);
  });
};

Edition.create = (newEdition, result) => {
  sql.query("INSERT INTO editions SET ?", newEdition, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created edition: ", { id: res.insertId, ...newEdition });
    result(null, { id: res.insertId, ...newEdition });
  });
};

Edition.findById = (id, result) => {
  sql.query(`SELECT * FROM editions WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found edition: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found edition with the id
    result({ kind: "not_found" }, null);
  });
};

Edition.updateById = (id, edition, result) => {
  sql.query(
    "UPDATE editions " + "SET editionName = ? " + "WHERE id = ?",
    [edition.editionName, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found edition with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated edition: ", { id: id, ...edition });
      result(null, { id: id, ...edition });
    }
  );
};

Edition.remove = (id, result) => {
  sql.query("DELETE FROM editions WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found edition with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted edition with id: ", id);
    result(null, res);
  });
};

module.exports = Edition;
