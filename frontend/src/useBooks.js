import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/books";

function useBooks() {
    const [books, setBooks] = useState([]);
    const [form, setForm] = useState({
        title: "",
        author: "",
        genre: "",
        publication_date: "",
        description: "",
    });
    const [editing, setEditing] = useState(false);
    const [editingBookId, setEditingBookId] = useState(null);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get(API_URL);
            setBooks(res.data);
        } catch (error) {
            setError("Failed to load books. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            if (editing) {
                await axios.put(`${API_URL}/${editingBookId}`, form);
                setSuccess("Book updated successfully!");
            } else {
                await axios.post(API_URL, form);
                setSuccess("Book added successfully!");
            }
            resetForm();
            fetchBooks();
        } catch (error) {
            setError("Failed to save book. Please try again.");
        } finally {
            setIsLoading(false);
            setTimeout(() => setSuccess(""), 3000);
        }
    };

    const resetForm = () => {
        setForm({ title: "", author: "", genre: "", publication_date: "", description: "" });
        setEditing(false);
        setEditingBookId(null);
        setError("");
    };

    const handleEdit = (book) => {
        setForm({ ...book });
        setEditing(true);
        setEditingBookId(book.id);
    };

    const handleDelete = async (id) => {
        setIsLoading(true);
        try {
            await axios.delete(`${API_URL}/${id}`);
            setSuccess("Book deleted successfully!");
            fetchBooks();
        } catch (error) {
            setError("Failed to delete book. Please try again.");
        } finally {
            setIsLoading(false);
            setTimeout(() => setSuccess(""), 3000);
        }
    };

    return {
        books,
        form,
        error,
        success,
        isLoading,
        editing,
        handleChange,
        handleSubmit,
        resetForm,
        handleEdit,
        handleDelete,
    };
}

export default useBooks;
