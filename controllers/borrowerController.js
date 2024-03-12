const Borrower = require('../models/Borrower');

// Controller functions for Borrower model
const borrowerController = {
    // Create a new borrower
    createBorrower: (req, res) => {
        const { name, email, date } = req.body;
        Borrower.createBorrower(name, email, date, (err, borrowerId) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.status(201).json({ id: borrowerId, message: 'Borrower created successfully' });
        });
    },

    // Update borrower details
    updateBorrower: (req, res) => {
        const { id } = req.params;
        const { name, email } = req.body;
        Borrower.updateBorrower(id, name, email, (err, affectedRows) => {
            if (err) {
                return res.status(500).json({ error: 'Error updating borrower' });
            }
            if (affectedRows === 0) {
                return res.status(404).json({ error: 'Borrower not found' });
            }
            res.json({ message: 'Borrower updated successfully' });
        });
    },

    // Delete a borrower
    deleteBorrower: (req, res) => {
        const { id } = req.params;
        Borrower.deleteBorrower(id, (err, affectedRows) => {
            if (err) {
                return res.status(500).json({ error: 'Error deleting borrower' });
            }
            if (affectedRows === 0) {
                return res.status(404).json({ error: 'Borrower not found' });
            }
            res.json({ message: 'Borrower deleted successfully' });
        });
    },

    // Get all borrowers
    getAllBorrowers: (req, res) => {
        Borrower.getAll((err, borrowers) => {
            if (err) {
                return res.status(500).json({ error: 'Error fetching borrowers' });
            }
            res.json(borrowers);
        });
    }
};

module.exports = borrowerController;
