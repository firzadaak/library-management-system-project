const asyncHandler = require('express-async-handler');
const { findManyUsers, createNewUser, findUserByIdAndDelete, findUserByIdAndUpdate } = require('../services/user.service');

// Get all staff users
const getAllStaffsHandler = asyncHandler(async (req, res) => {
    const staff = await findManyUsers({ isStaff: true });
    res.json(staff);
});

// Create a new staff user
const createStaffUserHandler = asyncHandler(async (req, res) => {
    const { roleId, username, email, password } = req.body;
    if (!(roleId && username && email && password)) throw new Error('Bad request: roleId, username, email, and password are required');
    const newStaffMember = await createNewUser({ roleId, username, email, password, isStaff: true });
    res.status(201).json(newStaffMember);
});

// Update a staff user's information
const updateStaffUserHandler = asyncHandler(async (req, res) => {
    const { roleId, username, email, password } = req.body;
    const updatedStaffMember = await findUserByIdAndUpdate(req.params.id, {roleId, username, email, password });
    res.status(202).json(updatedStaffMember);
});

// Delete a staff user (demote to regular user)
const deleteStaffUserHandler = asyncHandler(async (req, res) => {
    const staff = await findUserByIdAndUpdate(req.params.id, { isStaff: false });
    staff.roleId = null;
    await staff.save();
    res.status(200).json(staff);
});

// Get all users
const getAllUsersHandler = asyncHandler(async (req, res) => {
    const users = await findManyUsers({});
    res.json(users);
});

const removeUserHandler = asyncHandler(async (req, res) => {
    const user = await findUserByIdAndDelete(req.params.id);
    res.status(200).json(user);
});


module.exports = {
    getAllStaffsHandler,
    createStaffUserHandler,
    updateStaffUserHandler,
    deleteStaffUserHandler,
    getAllUsersHandler,
    removeUserHandler,
};