const { Sequelize } = require('sequelize');
const { bookModel } = require('./book.model');
const { userModel } = require('./user.model');
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = require('../config/env.config');
const { roleModel } = require('./role.model');

const db = new Sequelize({
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    dialect: "mysql",
});

const Book = bookModel(db);
const User = userModel(db);
const Role = roleModel(db);

// Borrower relationships
User.hasMany(Book, { foreignKey: 'borrower' });
Book.belongsTo(User, { foreignKey: 'borrower' });

// User-Role relationships
Role.hasMany(User, { foreignKey: 'roleId' });
User.belongsTo(Role, { foreignKey: 'roleId' });

module.exports = { db, Book, User, Role };