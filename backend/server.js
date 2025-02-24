const express = require("express");
const cors = require("cors");
const { Book } = require("./index");

const app = express();
app.use(cors());
app.use(express.json());

(async () => {
    try {
        await Book.sequelize.authenticate();
        console.log("Database connected...");
        await Book.sync();
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
})();


/*
--------------------------
(1) READ: Get all books
--------------------------
*/
app.get("/books", async (req, res) => {
    try {
        const books = await Book.findAll();
        res.json(books);
    } catch (error) {
        console.error("Error fetching books:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

/*
--------------------------
(2) CREATE: Add a new book
--------------------------
*/
app.post("/books", async (req, res) => {
    const { title, author, genre, publication_date, description } = req.body;
    try {
        const newBook = await Book.create({
            title,
            author,
            genre,
            publication_date,
            description,
        });
        res.json({ message: "Book added", book: newBook });
    } catch (error) {
        console.error("Error adding book:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

/*
--------------------------
(3) UPDATE: Modify a book
--------------------------
*/
app.put("/books/:id", async (req, res) => {
    const { title, author, genre, publication_date, description } = req.body;
    const { id } = req.params;
    try {
        const book = await Book.findByPk(id);
        if (!book) {
            return res.status(404).json({ error: "Book not found" });
        }
        book.title = title;
        book.author = author;
        book.genre = genre;
        book.publication_date = publication_date;
        book.description = description;
        await book.save();
        res.json({ message: "Book updated", book });
    } catch (error) {
        console.error("Error updating book:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

/*
--------------------------
(4) DELETE: Remove a book
--------------------------
*/
app.delete("/books/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findByPk(id);
        if (!book) {
            return res.status(404).json({ error: "Book not found" });
        }
        await book.destroy();
        res.json({ message: "Book deleted" });
    } catch (error) {
        console.error("Error deleting book:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

/*
--------------------------
(5) START SERVER
--------------------------
*/
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
