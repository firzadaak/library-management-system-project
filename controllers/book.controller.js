const asyncHandler = require('express-async-handler');

const { createNewBook, findManyBooks, findBookByIdAndDelete, findBookByIdAndUpdate } = require('../services/book.service');

// Create a new book
const createBookHandler = asyncHandler(async (req, res) => {
    const { title, author } = req.body;
    const book = await createNewBook({ title, author });
    res.status(201).json(book);
});

// Get all books with optional filters
const getManyBooksHandler = asyncHandler(async (req, res) => {
    const books = await findManyBooks({ ...req.query });
    res.json(books);
});

// Delete a book by ID
const deleteBookHandler = asyncHandler(async (req, res) => {
    const book = await findBookByIdAndDelete(req.params.id);
    res.status(202).json(book);
});

// Update a book by ID
const updateBookHandler = asyncHandler(async (req, res) => {
    const { title, author } = req.body;
    const book = await findBookByIdAndUpdate(req.params.id, { title, author });
    res.status(202).json(book);
});

// Lend or return a book
const bookLendingHandler = asyncHandler(async (req, res) => {
    const { action, userId } = req.body;
    if (!(action && userId && ["lend", "return"].includes(action))) throw new Error('Bad request: action and userId are required');
    
    const book = await findBookByIdAndUpdate(req.params.id, {});
    
    if (action === "lend") {
        if (!book.isAvailable) throw new Error('Book is currently not available for lending');
        book.borrower = userId;
        book.isAvailable = false;
    } else {
        book.borrower = null;
        book.isAvailable = true;
    }
    await book.save();
    res.status(202).json(book);
});

module.exports = {
    createBookHandler,
    getManyBooksHandler,
    deleteBookHandler,
    updateBookHandler,
    bookLendingHandler,
}; 