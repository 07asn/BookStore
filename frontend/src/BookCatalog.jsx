import React from "react";
import { PencilIcon, TrashIcon, CheckIcon, XIcon } from "@heroicons/react/outline";
import useBooks from "./useBooks";

function BookCatalog() {
    const {
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
    } = useBooks();

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">📚 Book Catalog</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form Section */}
                <div className="lg:col-span-1 bg-white rounded-xl shadow-xl p-6 h-fit sticky top-6">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                        {editing ? "✏️ Edit Book" : "➕ Add New Book"}
                    </h2>
                    {error && (
                        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg flex items-center">
                            <XIcon className="h-5 w-5 mr-2" />
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg flex items-center">
                            <CheckIcon className="h-5 w-5 mr-2" />
                            {success}
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            placeholder="Book Title"
                            className="w-full px-4 py-2 rounded-lg border"
                        />
                        <input
                            name="author"
                            value={form.author}
                            onChange={handleChange}
                            placeholder="Author Name"
                            className="w-full px-4 py-2 rounded-lg border"
                        />
                        <input
                            list="genres"
                            name="genre"
                            value={form.genre}
                            onChange={handleChange}
                            placeholder="Select or type genre"
                            className="w-full px-4 py-2 rounded-lg border"
                        />
                        <input
                            type="date"
                            name="publication_date"
                            value={form.publication_date}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border"
                        />
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            rows="3"
                            placeholder="Enter book description..."
                            className="w-full px-4 py-2 rounded-lg border"
                        ></textarea>
                        <div className="flex gap-3 pt-4">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg"
                            >
                                {isLoading ? "Processing..." : editing ? "Update Book" : "Add Book"}
                            </button>
                            {editing && (
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg"
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* Book List Section */}
                <div className="lg:col-span-2">
                    <h2 className="text-2xl font-semibold mb-6 text-gray-700">Book Collection</h2>
                    {books.length === 0 ? (
                        <div className="text-center p-8 bg-white rounded-xl shadow">
                            <p className="text-gray-500">No books found in the catalog</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {books.map((book) => (
                                <div key={book.id} className="bg-white rounded-xl shadow p-6">
                                    <h3 className="text-xl font-semibold text-gray-800">{book.title}</h3>
                                    <h4 className="text-gray-800">{book.publication_date}</h4>
                                    <p className="text-green-600 mt-1">{book.author}</p>
                                    <p className="text-gray-600 mt-1">{book.description}</p>
                                    <div className="flex gap-2">
                                        <button onClick={() => handleEdit(book)} className="p-2 text-blue-600">
                                            <PencilIcon className="h-5 w-5" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(book.id)}
                                            className="p-2 text-red-600"
                                        >
                                            <TrashIcon className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default BookCatalog;
