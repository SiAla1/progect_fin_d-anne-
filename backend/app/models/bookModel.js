const sql = require("./db.js");

// constructor
const Book = function (book) {
  this.title = book.title;
  this.authorId = book.authorId;
  this.categoryId = book.categoryId;
  this.editionId = book.editionId;
  this.language = book.language;
};

Book.getAll = (title, author, category, edition, result) => {
  let query =
    "SELECT books.id, books.title, authors.authorName, categories.categoryName, editions.editionName, books.language " +
    "FROM " +
    "Books books " +
    "LEFT JOIN Authors authors       ON books.authorId   = authors.id " +
    "LEFT JOIN Editions editions     ON books.editionId  = editions.id " +
    "LEFT JOIN Categories categories ON books.categoryId = categories.id ";
  const filter = [];
  let params = [];
  if (title) {
    filter.push(`title LIKE '%${title}%'`);
    params.push(title);
  }
  if (author && author != 0) {
    filter.push(`authorId = ${author}`);
    params.push(author);
    console.log("author: ", author);
  }
  if (category && category != 0) {
    filter.push(`categoryId = ${category}`);
    params.push(category);
  }
  if (edition && edition != 0) {
    filter.push(`editionId = ${edition}`);
    params.push(edition);
  }
  if (params.length > 1) {
    query += " WHERE " + filter.join(" AND ");
  } else if (params.length == 1) {
    query += " WHERE " + filter[0];
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

Book.create = (newBook, result) => {
  sql.query("INSERT INTO books SET ?", newBook, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created book: ", { id: res.insertId, ...newBook });
    result(null, { id: res.insertId, ...newBook });
  });
};

Book.findById = (id, result) => {
  sql.query(`SELECT * FROM books WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found book: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found book with the id
    result({ kind: "not_found" }, null);
  });
};

Book.updateById = (id, book, result) => {
  sql.query(
    "UPDATE books " +
      "SET title = ?, authorId = ?, editionId = ?, categoryId = ?, language = ? " +
      "WHERE id = ?",
    [
      book.title,
      book.authorId,
      book.editionId,
      book.categoryId,
      book.language,
      id,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found book with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated book: ", { id: id, ...book });
      result(null, { id: id, ...book });
    }
  );
};

Book.remove = (id, result) => {
  sql.query("DELETE FROM books WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found book with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted book with id: ", id);
    result(null, res);
  });
};

module.exports = Book;
