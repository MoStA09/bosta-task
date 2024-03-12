const express = require('express');
const router = express.Router();
const borrowerController = require('../controllers/borrowerController');

/**
 * @swagger
 * /borrowers/borrowers:
 *   post:
 *     summary: Create a new borrower
 *     description: Create a new borrower with the provided name, email, and registration date.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the borrower
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the borrower
 *               date:
 *                 type: string
 *                 format: date
 *                 description: The registration date of the borrower (YYYY-MM-DD)
 *     responses:
 *       '201':
 *         description: Borrower created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The ID of the newly created borrower
 *                 message:
 *                   type: string
 *                   description: A success message
 *       '500':
 *         description: Internal server error
 */

// Create a new borrower
router.post('/borrowers', borrowerController.createBorrower);

/**
 * @swagger
 * /borrowers/borrowers/{id}:
 *   put:
 *     summary: Update borrower details
 *     description: Update details of a specific borrower identified by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the borrower to update
 *         schema:
 *           type: string
 *       - in: body
 *         name: borrower
 *         required: true
 *         description: The updated details of the borrower
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               description: The updated name of the borrower
 *             email:
 *               type: string
 *               format: email
 *               description: The updated email address of the borrower
 *     responses:
 *       '200':
 *         description: Borrower updated successfully
 *       '404':
 *         description: Borrower not found
 *       '500':
 *         description: Internal server error
 */

// Update borrower details
router.put('/borrowers/:id', borrowerController.updateBorrower);

/**
 * @swagger
 * /borrowers/borrowers/{id}:
 *   delete:
 *     summary: Delete a borrower
 *     description: Delete a specific borrower identified by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the borrower to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Borrower deleted successfully
 *       '404':
 *         description: Borrower not found
 *       '500':
 *         description: Internal server error
 */

// Delete a borrower
router.delete('/borrowers/:id', borrowerController.deleteBorrower);

/**
 * @swagger
 * /borrowers/borrowers:
 *   get:
 *     summary: Get all borrowers
 *     description: Retrieve a list of all borrowers.
 *     responses:
 *       '200':
 *         description: A list of borrowers
 *       '500':
 *         description: Internal server error
 */

// Get all borrowers
router.get('/borrowers', borrowerController.getAllBorrowers);

module.exports = router;
