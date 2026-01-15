const { Router } = require('express');
const { signUpHandler, signInHandler, getCurrentUserHandler, logoutUserHandler, updateUserHandler, getAllUsersHandler } = require('../controllers/user.controller');
const passport = require('passport');
const { isAuthenticated } = require('../middleware/access-control.middleware');

const router = Router();

/**
 * @openapi
 * /api/users:
 *   post:
 *     tags:
 *       - Users
 *     summary: Sign up a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: Username for the new user
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email address for the new user
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Password for the new user
 *     responses:
 *       '201':
 *         description: User created successfully
 *       '400':
 *         description: Bad request - missing required fields
 *       '500':
 *         description: Internal server error
 *
 *   get:
 *     tags:
 *       - Users
 *     summary: Get current authenticated user
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       '200':
 *         description: Success, return current user
 *       '401':
 *         description: Unauthorized - user not logged in
 *       '500':
 *         description: Internal server error
 *
 *   patch:
 *     tags:
 *       - Users
 *     summary: Update current user's information
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       '200':
 *         description: User updated successfully
 *       '401':
 *         description: Unauthorized - user not logged in
 *       '500':
 *         description: Internal server error
 *
 * /api/users/all:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get all users
 *     responses:
 *       '200':
 *         description: Success, return all users
 *       '500':
 *         description: Internal server error
 *
 * /api/users/login:
 *   post:
 *     tags:
 *       - Users
 *     summary: Sign in with email and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *               password:
 *                 type: string
 *                 format: password
 *                 description: User's password
 *     responses:
 *       '200':
 *         description: Login successful
 *       '401':
 *         description: Unauthorized - invalid credentials
 *       '500':
 *         description: Internal server error
 *
 * /api/users/logout:
 *   post:
 *     tags:
 *       - Users
 *     summary: Logout current user
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       '200':
 *         description: Logout successful
 *       '500':
 *         description: Internal server error
 */

// POST /api/users - Sign up a new user
// GET /api/users - Get current authenticated user
// PATCH /api/users - Update current user's information
router
    .route("/")
    .post(signUpHandler)
    .get(isAuthenticated, getCurrentUserHandler)
    .patch(isAuthenticated, updateUserHandler);

// GET /api/users/all - Get all users (no authentication required)
router
    .route("/all")
    .get(getAllUsersHandler);

// POST /api/users/login - Sign in with email and password
router
    .route("/login")
    .post(passport.authenticate("local"), signInHandler);

// POST /api/users/logout - Logout current user
router
    .route("/logout")
    .post(logoutUserHandler);

module.exports = { userRouter: router };