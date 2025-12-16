const { Book } = require('../models');

// create new book
const createNewBook = (body) => {
    return Book.create({ ... body });
}

// find many books
const findManyBooks = (searchParam) => {
    return Book.findAll({ where: { ...searchParam } });
}

// find many books
const findOneBook = (searchParam) => {
    return Book.findAll({ where: { ...searchParam } });
}

// find by id
const findBookById = (id) => {
    return Book.findByPk(id);
}

// update book
const findBookByIdAndUpdate = async (id, body) => {
    const book = await findBookById(id);
    for (const key of Object.keys(body)) {
        book[key] = body[key] ?? book[key];
    }
    await book.save();
    return book;
}

// delete book
const findBookByIdAndDelete = async (id) => {
    const book = await findBookById(id);
    await book.destroy();
    return book;
}

// borrowing

module.exports = {
    createNewBook,
    findManyBooks,
    findOneBook,
    findBookById,
    findBookByIdAndUpdate,
    findBookByIdAndDelete,
};