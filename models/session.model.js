const { DataTypes } = require('sequelize');

const sessionModel = (db) => {
    return db.define('Session', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        bookId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        borrowedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        dueDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        returnedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM('borrowed', 'returned', 'overdue'),
            allowNull: false,
            defaultValue: 'borrowed',
        },
        notes: {
            type: DataTypes.TEXT,
            allowNull: true,
        }
    });
};

module.exports = { sessionModel };