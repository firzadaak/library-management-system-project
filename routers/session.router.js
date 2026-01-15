const { Router } = require('express');
const { 
    borrowBookHandler, 
    getSessionsHandler, 
    getSessionByIdHandler, 
    returnBookHandler,
    updateSessionHandler,
    deleteSessionHandler 
} = require('../controllers/session.controller');
const { isAuthenticated, isStaff, hasPermission } = require('../middleware/access-control.middleware');
const { session } = require('passport');

const sessionRouter = Router();

sessionRouter.use(isAuthenticated, isStaff);
sessionRouter.use(hasPermission("canLendBooks"));   

// POST /api/sessions - Borrow a book (requires staff with canLendBooks)
// GET /api/sessions - Get all borrowing sessions (requires staff with canLendBooks)
sessionRouter
    .route("/")
    .post(borrowBookHandler)
    .get(getSessionsHandler);

// PATCH /api/sessions/:id/return - Return a book (requires staff with canLendBooks)
sessionRouter
    .route("/:id/return")
    .patch(returnBookHandler);

// GET /api/sessions/:id - Get session by ID (requires staff with canLendBooks)
// PATCH /api/sessions/:id - Update session (requires staff with canLendBooks)
// DELETE /api/sessions/:id - Delete session (requires staff with canLendBooks)
sessionRouter
    .route("/:id")
    .get(getSessionByIdHandler)
    .patch(updateSessionHandler)
    .delete(deleteSessionHandler);

module.exports = { sessionRouter };
