const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

/**
 * @swagger
 * /books/getAll:
 *   get:
 *     summary: Get all books
 *     description: Retrieve a list of all books.
 *     responses:
 *       '200':
 *         description: A list of books
 *       '500':
 *         description: Internal server error
 */

// Define routes
router.get('/getAll', bookController.getAllBooks);
/**
 * @swagger
 * /addBook:
 *   post:
 *     summary: Add a new book
 *     description: Add a new book with the provided details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the book
 *               author:
 *                 type: string
 *                 description: The author of the book
 *               isbn:
 *                 type: string
 *                 description: The ISBN of the book
 *               quantity:
 *                 type: integer
 *                 description: The available quantity of the book
 *               shelfLocation:
 *                 type: string
 *                 description: The shelf location of the book
 *     responses:
 *       '200':
 *         description: Book added successfully
 *       '500':
 *         description: Internal server error
 */

router.post('/addBook', bookController.addBook);
router.delete('/deleteBook', bookController.deleteBook);
router.get('/getBook/:searchParam', bookController.searchBook);

// Other routes can be defined similarly

module.exports = router;
