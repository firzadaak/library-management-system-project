const asyncHandler = require('express-async-handler');
const { createNewRole, findManyRoles, findRoleByIdAndUpdate, findRoleByIdAndDelete } = require('../services/role.service');

// Create a new role
const newRoleHandler = asyncHandler(async (req, res) => {
    const { name, ...perms } = req.body;
    const role = await createNewRole({ name, ...perms });
    res.status(201).json(role);
});

// Update an existing role
const updateRoleHandler = asyncHandler(async (req, res) => {
    const { name, ...perms } = req.body;
    const role = await findRoleByIdAndUpdate(req.params.id, { name, ...perms });
    res.status(202).json(role);
});

// Delete a role
const deleteRoleHandler = asyncHandler(async (req, res) => {
    const role = await findRoleByIdAndDelete(req.params.id);
    res.status(200).json(role);
});

// Find all roles
const findAllRolesHandler = asyncHandler(async (req, res) => {
    const roles = await findManyRoles({});
    res.json(roles);
});

module.exports = {
    newRoleHandler,
    updateRoleHandler,
    deleteRoleHandler,
    findAllRolesHandler,
};
