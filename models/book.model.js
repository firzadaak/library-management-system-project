const { DataTypes } = require('sequelize');

/**
 * @openapi
 * components:
 *  schemas:
 *      CreateBookDto:
 *        type: object
 *        properties:
 *          title:
 *              type: string
 *              default: An amazing book
 *          author:
 *              type: string
 *              default: Jane Doe
 *        required:
 *          - title
 *          - author
 *      UpdateBookDto:
 *        type: object
 *        properties:
 *          title:
 *              type: string
 *              default: An amazing book
 *          author:
 *              type: string
 *              default: Jane Doe
 *        required:
 * 
 *      BookDto:
 *        type: object
 *        properties:
 *          id:
 *             type: string
 *             format: uuid
 *          title:
 *              type: string
 *          author:
 *              type: string
 *          isAvailable:
 *              type: boolean
 *              description: Whether the book is available for borrowing
 *              default: true
 *          borrower:
 *              type: string
 *              format: uuid
 *              nullable: true
 *              description: User ID of current borrower (null if available)
 *          User:
 *              type: object
 *              nullable: true
 *              description: Populated borrower user information
 *          createdAt:
 *              type: string
 *              format: date-time
 *          updatedAt:
 *              type: string
 *              format: date-time
 */

const bookModel = (db) => {
    return db.define('Book', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isAvailable: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        borrower: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
    });
}

module.exports = { bookModel };