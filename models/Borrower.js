const db = require('../db/connection');
class Borrower {
    constructor(name, email, date) {
      this.name = name;
      this.email = email;
      this.date = date;
    }
    static createBorrower(name, email, date, callback) {
        const query = 'INSERT INTO borrower (name, email, date) VALUES (?, ?, ?)';
        db.query(query, [name, email, date], (err, result) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, result.insertId);
        });
    }

    static updateBorrower(id, name, email, callback) {
        const query = 'UPDATE borrower SET name = ?, email = ? WHERE id = ?';
        db.query(query, [name, email, id], (err, result) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, result.affectedRows);
        });
    }

    static deleteBorrower(id, callback) {
        const query = 'DELETE FROM borrower WHERE id = ?';
        db.query(query, [id], (err, result) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, result.affectedRows);
        });
    }

    static getAll(callback) {
        const query = 'SELECT * FROM borrower';
        db.query(query, (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    }
    static getBorrowerBooks(borrowerId, callback) {
        const query = 'SELECT * FROM book WHERE borrower_id = ?';
        db.query(query, [borrowerId], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    }
}



module.exports = Borrower;

