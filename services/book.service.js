const { Book, User } = require('../models');

// create new book
const createNewBook = (body) => {
    return Book.create({ ...body });
}

// find many books
const findManyBooks = (searchParam) => {
    return Book.findAll({ where: { ...searchParam } });
}

// find one book
const findOneBook = (searchParam) => {
    return Book.findOne({ where: { ...searchParam } });
}

// find book by id
const findBookById = async (id) => {
    const book = await Book.findByPk(id, {include: [User]});
    if (!book) throw new Error('Book with specified id does not exist');
    return book;
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