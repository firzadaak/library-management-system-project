const { User } = require('../models');

// create new user
const createNewUser = async (body) => {
    try {
        return await User.create({ ...body });
    } catch (error) {
        console.error('Error in createNewUser:', error);
        throw error;
    }
}

// find many users
const findManyUsers = (searchParam) => {
    return User.findAll({ where: { ...searchParam } });
}

// find one user
const findOneUser = (searchParam) => {
    return User.findOne({ where: { ...searchParam } });
}

// find user by id
const findUserById = async (id) => {
    const user = await User.findByPk(id);
    if (!user) throw new Error('User with specified id does not exist');
    return user;
}

// update user
const findUserByIdAndUpdate = async (id, body) => {
    const user = await findUserById(id);
    for (const key of Object.keys(body)) {
        user[key] = body[key] ?? user[key];
    }
    await user.save();
    return user;
}

// delete user
const findUserByIdAndDelete = async (id) => {
    const user = await findUserById(id);
    await user.destroy();
    return user;
}

module.exports = {
    createNewUser,
    findManyUsers,
    findOneUser,
    findUserById,
    findUserByIdAndUpdate,
    findUserByIdAndDelete,
};