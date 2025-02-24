const express = require("express");
const cors = require("cors");
const { query } = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

/*
--------------------------
(1) READ: Get all books
--------------------------
*/
app.get("/books", async (req, res) => {
    try {
        const result = await query("SELECT * FROM books");
        res.json(result.rows);
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
        await query(
            `INSERT INTO books (title, author, genre, publication_date, description)
            VALUES ($1, $2, $3, $4, $5)`,
            [title, author, genre, publication_date, description]
        );
        res.json({ message: "Book added" });
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
        await query(
            `UPDATE books 
        SET title = $1, author = $2, genre = $3, publication_date = $4, description = $5
        WHERE id = $6`,
            [title, author, genre, publication_date, description, id]
        );
        res.json({ message: "Book updated" });
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
        await query("DELETE FROM books WHERE id = $1", [id]);
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
