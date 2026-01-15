const asyncHandler = require('express-async-handler');
const { createNewSession, findManySessions, findSessionById, findSessionByIdAndUpdate, findSessionByIdAndDelete } = require('../services/session.service');

// Borrow a book (create session)
const borrowBookHandler = asyncHandler(async (req, res) => {
    const { bookId, dueDate } = req.body;
    if (!(bookId && dueDate)) {
        throw new Error('Bad request: bookId and dueDate are required');
    }
    
    const session = await createNewSession({
        userId: req.user.id,
        bookId,
        dueDate,
        status: 'borrowed'
    });
    
    res.status(201).json(session);
});

// Get all borrowing sessions (with filters)
const getSessionsHandler = asyncHandler(async (req, res) => {
    const { status, userId } = req.query;
    const filters = {};
    
    if (status) filters.status = status;
    if (userId) filters.userId = userId;
    
    const sessions = await findManySessions(filters);
    res.json(sessions);
});

// Get a specific session by ID
const getSessionByIdHandler = asyncHandler(async (req, res) => {
    const session = await findSessionById(req.params.id);
    res.json(session);
});

// Return a book (update session)
const returnBookHandler = asyncHandler(async (req, res) => {
    const session = await findSessionByIdAndUpdate(req.params.id, {
        returnedAt: new Date(),
        status: 'returned'
    });
    res.json(session);
});

// Update session details
const updateSessionHandler = asyncHandler(async (req, res) => {
    const session = await findSessionByIdAndUpdate(req.params.id, req.body);
    res.json(session);
});

// Delete a session
const deleteSessionHandler = asyncHandler(async (req, res) => {
    const session = await findSessionByIdAndDelete(req.params.id);
    res.json(session);
});

module.exports = {
    borrowBookHandler,
    getSessionsHandler,
    getSessionByIdHandler,
    returnBookHandler,
    updateSessionHandler,
    deleteSessionHandler
};
