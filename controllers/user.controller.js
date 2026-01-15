const asyncHandler = require('express-async-handler');

const { createNewUser, findManyUsers, findOneUser, findUserById, findUserByIdAndDelete, findUserByIdAndUpdate } = require('../services/user.service');

// Sign up a new user
const signUpHandler = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!(username && email && password)) throw new Error('Bad request: username, email, and password are required');
    const user = await createNewUser({ username, email, password });
    res.status(201).json(user);
});

// Sign in a user (after passport authentication)
const signInHandler = asyncHandler(async (req, res) => {
    res.json(req.user);
});

// Get current authenticated user
const getCurrentUserHandler = asyncHandler(async (req, res) => {
    res.json(req.user);
});

// Logout current user
const logoutUserHandler = asyncHandler(async (req, res) => {
    req.logout((err) => {
        if (err) {
            throw new Error("unable to logout");
        }
        res.sendStatus(200);
    });
});

// Update current user's information
const updateUserHandler = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    const user = await findUserByIdAndUpdate(req.user.id, 
        { username, email, password });
    res.json(user);
});

// Get all users
const getAllUsersHandler = asyncHandler(async (req, res) => {
    const users = await findManyUsers({});
    res.json(users);
});

module.exports = {
    signUpHandler,
    signInHandler,
    getCurrentUserHandler,
    logoutUserHandler,
    updateUserHandler,
    getAllUsersHandler,
};