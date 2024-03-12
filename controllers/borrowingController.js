const Book = require('../models/BookModel');
const Borrower = require('../models/Borrower');

const borrowingController = {
    checkoutBook: (req, res) => {
        const { bookId, borrowerId, dueDate } = req.body;
        Book.checkoutBook(bookId, borrowerId, dueDate, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error checking out book' });
            }
            res.json({ message: 'Book checked out successfully' });
        });
    },

    returnBook: (req, res) => {
        const { bookId } = req.body;
        Book.returnBook(bookId, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error returning book' });
            }
            res.json({ message: 'Book returned successfully' });
        });
    },

    getBorrowerBooks: (req, res) => {
        const { borrowerId } = req.params;
        Borrower.getBorrowerBooks(borrowerId, (err, books) => {
            if (err) {
                return res.status(500).json({ error: 'Error fetching borrower books' });
            }
            res.json(books);
        });
    },

    getOverdueBooks: (req, res) => {
        Book.getOverdueBooks((err, books) => {
            if (err) {
                return res.status(500).json({ error: 'Error fetching overdue books' });
            }
            res.json(books);
        });
    }
};

module.exports = borrowingController;
