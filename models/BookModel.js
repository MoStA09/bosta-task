// models/bookModel.js

const db = require('../db/connection');

// Define book model
class Book {
  constructor(title, author, isbn, quantity, shelfLocation) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.quantity = quantity;
    this.shelfLocation = shelfLocation;
  }

  static getAllBooks(callback) {
    db.query('SELECT * FROM book', (err, rows) => {
      if (err) throw err;
      callback(rows);
    });
  }

  static addBook(book, callback) {
    try {
      db.query('INSERT INTO book SET ?', book, (err, result) => {
        if (err) {
          throw err;
        }
        callback(result);
      });
    } catch (error) {
      console.error("Error occurred while adding book:", error);
    }
  }

  static deleteBook(id, callback) {
    try {
        db.query('DELETE FROM book WHERE id = ?', id, (err, result) => {
            if (err) {
                callback(false); // Indicate failure via the callback
            } else {
                if (result.affectedRows > 0) {
                    callback(true); // Indicate success via the callback
                } else {
                    callback(false); // Indicate failure via the callback
                }
            }
        });
    } catch (error) {
        callback(false); // Indicate failure via the callback
    }
}
static searchBook(query, callback) {
  const sql = `SELECT * FROM book WHERE title LIKE ? OR author LIKE ? OR isbn LIKE ?`;
  const searchQuery = `%${query}%`; // Assuming you want to perform a partial match

  db.query(sql, [searchQuery, searchQuery, searchQuery], (err, results) => {
      if (err) {
          console.error("Error occurred while searching for books:", err);
          callback(err, null); // Pass error as first argument
      } else {
          callback(null, results); // Pass results as second argument
      }
  });
}
static checkoutBook(bookId, borrowerId, dueDate, callback) {
  const query = 'UPDATE book SET available = false, borrower_id = ?, due_date = ? WHERE id = ?';
  db.query(query, [borrowerId, dueDate, bookId], (err, result) => {
      if (err) {
          return callback(err, null);
      }
      callback(null, result.affectedRows);
  });
}

static returnBook(bookId, callback) {
  const query = 'UPDATE book SET available = true, borrower_id = null, due_date = null WHERE id = ?';
  db.query(query, [bookId], (err, result) => {
      if (err) {
          return callback(err, null);
      }
      callback(null, result.affectedRows);
  });
}

static getBooksByBorrower(borrowerId, callback) {
  const query = 'SELECT * FROM book WHERE borrower_id = ?';
  db.query(query, [borrowerId], (err, results) => {
      if (err) {
          return callback(err, null);
      }
      callback(null, results);
  });
}

static getOverdueBooks(callback) {
  const currentDate = new Date().toISOString().slice(0, 10);
  const query = 'SELECT * FROM book WHERE due_date < ?';
  db.query(query, [currentDate], (err, results) => {
      if (err) {
          return callback(err, null);
      }
      callback(null, results);
  });
}


}







  


module.exports = Book;
