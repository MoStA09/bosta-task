/**
 * @swagger
 * /borrowing/checkout:
 *   post:
 *     summary: Checkout a book
 *     description: Checkout a book to a borrower
 *     parameters:
 *       - in: body
 *         name: checkout
 *         description: Book checkout details
 *         schema:
 *           type: object
 *           properties:
 *             bookId:
 *               type: number
 *             borrowerId:
 *               type: number
 *             dueDate:
 *               type: string
 *               format: date
 *     responses:
 *       200:
 *         description: Successful operation
 *       400:
 *         description: Invalid input
 */



const express = require('express');
const router = express.Router();
const borrowingController = require('../controllers/borrowingController');

// Checkout a book
router.post('/checkout', borrowingController.checkoutBook);

/**
 * @swagger
 * /borrowing/return:
 *   post:
 *     summary: return a book
 *     description: return a book borrowed
 *     parameters:
 *       - in: body
 *         name: return
 *         description: Book return 
 *         schema:
 *           type: object
 *           properties:
 *             bookId:
 *               type: number
 *     responses:
 *       200:
 *         description: Successful operation
 *       400:
 *         description: Invalid input
 */

// Return a book
router.post('/return', borrowingController.returnBook);

/**
 * @swagger
 * /borrowing/borrowers/{borrowerId}/books:
 *   get:
 *     summary: Get books borrowed by a specific borrower
 *     description: Retrieve a list of books borrowed by a specific borrower identified by their ID.
 *     parameters:
 *       - in: path
 *         name: borrowerId
 *         required: true
 *         description: ID of the borrower
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A list of books borrowed by the borrower
 *       '404':
 *         description: Borrower not found
 *       '500':
 *         description: Internal server error
 */

// Get borrower's books
router.get('/borrowers/:borrowerId/books', borrowingController.getBorrowerBooks);

/**
 * @swagger
 * /borrowing/overdue-books:
 *   get:
 *     summary: Get overdue books
 *     description: Retrieve a list of books that are overdue.
 *     responses:
 *       '200':
 *         description: A list of overdue books
 *       '500':
 *         description: Internal server error
 */

// Get overdue books
router.get('/overdue-books', borrowingController.getOverdueBooks);

module.exports = router;
