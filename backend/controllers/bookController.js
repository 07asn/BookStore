const Book = require("../models/Book");

// GET
exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.findAll();
        res.json(books);
    } catch (error) {
        console.error("Error fetching books:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// POST
exports.addBook = async (req, res) => {
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
};

// PUT
exports.updateBook = async (req, res) => {
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
};

// DELETE
exports.deleteBook = async (req, res) => {
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
};
