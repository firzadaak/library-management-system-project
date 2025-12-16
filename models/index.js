const { Sequelize } = require('sequelize');
const { bookModel } = require('./book.model');

const db = new Sequelize({
    host: "127.0.01",
    post: "3306",
    username: "root",
    password: "Runningman21@",
    database: "library_management_system",
    dialect: "mysql",
});

const Book = bookModel(db);

module.exports = { db };