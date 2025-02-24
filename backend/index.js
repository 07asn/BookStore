const { Sequelize } = require("sequelize");

// Sequelize connection
const sequelize = new Sequelize("book_catalog", "postgres", "123", {
    host: "localhost",
    dialect: "postgres",
});

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// The Book Model
db.Book = sequelize.define("Book", {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    author: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    genre: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    publication_date: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: true,
    },
}, {
    tableName: 'books',  // Table name
    timestamps: false,
});

module.exports = db;
