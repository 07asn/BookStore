require('dotenv').config();
const { Sequelize } = require("sequelize");

//-------------------------------------
// Configuration
//-------------------------------------
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: "postgres",
        port: process.env.DB_PORT,
    }
);

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

//-------------------------------------
// Define Book Model
//-------------------------------------
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
    tableName: 'books',  
    timestamps: false,
});

module.exports = db;
