const { Role } = require('../models');

// create new role
const createNewRole = (body) => {
    return Role.create({ ...body });
}

// find many roles
const findManyRoles = (searchParam) => {
    return Role.findAll({ where: { ...searchParam } });
}

// find one role
const findOneRole = (searchParam) => {
    return Role.findOne({ where: { ...searchParam } });
}

// find role by id
const findRoleById = async (id) => {
    const role = await Role.findByPk(id);
    if (!role) throw new Error('Role with specified id does not exist');
    return role;
}

// update role 
const findRoleByIdAndUpdate = async (id, body) => {
    const role = await findRoleById(id);
    for (const key of Object.keys(body)) {
        role[key] = body[key] ?? role[key];
    }
    await role.save();
    return role;
}

// delete role
const findRoleByIdAndDelete = async (id) => {
    const role = await findRoleById(id);
    await role.destroy();
    return role;
}

// borrowing

module.exports = {
    createNewRole,
    findManyRoles,
    findOneRole,
    findRoleById,
    findRoleByIdAndUpdate,
    findRoleByIdAndDelete,
};