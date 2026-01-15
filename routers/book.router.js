const { Router } = require('express');
const { createBookHandler, getManyBooksHandler, updateBookHandler, deleteBookHandler, bookLendingHandler } = require('../controllers/book.controller');
const { isAuthenticated, isStaff, hasPermission } = require('../middleware/access-control.middleware');

const bookRouter = Router();

/**
 * @openapi
 * /api/books:
 *   get:
 *     tags:
 *       - Books
 *     summary: Get all the books
 *     description: Retrieve all books with their availability status and current borrower information
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       '200':
 *         description: Success, return all the books in array
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BookDto'
 *       '403':
 *         description: Forbidden - requires staff with canLendBooks permission
 *       '500':
 *         description: Internal server error
 *
 *   post:
 *     tags:
 *       - Books
 *     summary: Create a new book
 *     description: Add a new book to the library inventory
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateBookDto'
 *     responses:
 *       '201':
 *         description: Created a book successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BookDto'
 *       '403':
 *         description: Forbidden - requires staff with canManageBooks permission
 *       '500':
 *         description: Internal server error
 *
 * /api/books/{id}:
 *   patch:
 *     tags:
 *       - Books
 *     summary: Update a book
 *     description: Update book information (title, author)
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Book ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateBookDto'
 *     responses:
 *       '202':
 *         description: Successfully updated the book
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BookDto'
 *       '403':
 *         description: Forbidden - requires staff with canManageBooks permission
 *       '404':
 *         description: Book not found
 *       '500':
 *         description: Internal server error
 * 
 *   delete:
 *     tags:
 *       - Books
 *     summary: Delete a book
 *     description: Remove a book from the library inventory
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Book ID
 *     responses:
 *       '202':
 *         description: Successfully deleted a book
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BookDto'
 *       '403':
 *         description: Forbidden - requires staff with canManageBooks permission
 *       '404':
 *         description: Book not found
 *       '500':
 *         description: Internal server error
 *
 * /api/books/{id}/lend:
 *   patch:
 *     tags:
 *       - Books
 *     summary: Lend or return a book
 *     description: |
 *       Primary borrowing system endpoint. Updates book availability and tracks current borrower.
 *       - **lend**: Assigns book to a user and marks as unavailable
 *       - **return**: Removes borrower and marks book as available
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Book ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - action
 *               - userId
 *             properties:
 *               action:
 *                 type: string
 *                 enum: [lend, return]
 *                 description: Action to perform - "lend" to borrow a book, "return" to return it
 *                 example: lend
 *               userId:
 *                 type: string
 *                 format: uuid
 *                 description: User ID of the borrower
 *                 example: de2718e6-e206-4171-a41d-b83ba96f38b9
 *     responses:
 *       '202':
 *         description: Book lending action performed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                 title:
 *                   type: string
 *                 author:
 *                   type: string
 *                 isAvailable:
 *                   type: boolean
 *       '400':
 *         description: Bad request - invalid action, missing userId, or book not available
 *       '403':
 *         description: Forbidden - requires staff with canLendBooks permission
 *       '404':
 *         description: Book not found
 *       '500':
 *         description: Internal server error
 */
/** bookRouter.use(isAuthenticated, isStaff);
 *         description: Book lending action performed successfully
 *       '403':
 *         description: Forbidden - requires staff with canLendBooks permission
 *       '404':
 *         description: Book not found
 *       '500':
 *         description: Internal server error
 */

bookRouter.use(isAuthenticated, isStaff);

// POST /api/books - Create a new book (requires staff with canManageBooks)
// GET /api/books - Get all books (requires staff with canLendBooks)
bookRouter
    .route("/")
    .post(hasPermission("canManageBooks"), createBookHandler)
    .get(hasPermission("canLendBooks"), getManyBooksHandler)

// PATCH /api/books/:id - Update a book (requires staff with canManageBooks)
// DELETE /api/books/:id - Delete a book (requires staff with canManageBooks)
bookRouter
    .route("/:id")
    .patch(hasPermission("canManageBooks"), updateBookHandler)
    .delete(hasPermission("canManageBooks"), deleteBookHandler)

// PATCH /api/books/:id/lend - Lend or return a book (requires staff with canLendBooks)
bookRouter
    .route("/:id/lend")
    .patch(hasPermission("canLendBooks"), bookLendingHandler);

module.exports = { bookRouter };