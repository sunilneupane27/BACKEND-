import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
    const [books, setBooks] = useState([]);
    const [bookForm, setBookForm] = useState({ booktitle: '', PubYear: '', author: '', Topic: '', formate: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    // Fetch books from API
    const fetchBooks = () => {
        axios.get('http://localhost:5000/allbooks')
            .then(response => setBooks(response.data))
            .catch(error => console.error(error));
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    // Add book
    const handleAddBook = () => {
        axios.post('http://localhost:5000/addbooks', bookForm)
            .then(() => fetchBooks())
            .catch(error => console.error(error));
        setBookForm({ booktitle: '', PubYear: '', author: '', Topic: '', formate: '' });
    };

    // Delete book
    const handleDeleteBook = (id) => {
        axios.post(`http://localhost:5000/deletebook/${id}`)
            .then(() => fetchBooks())
            .catch(error => console.error(error));
    };

    // Update book
    const handleUpdateBook = () => {
        axios.post(`http://localhost:5000/updatebook/${editId}`, bookForm)
            .then(() => {
                fetchBooks();
                setIsEditing(false);
                setEditId(null);
            })
            .catch(error => console.error(error));
    };

    // Set the book form when editing
    const handleEditBook = (book) => {
        setIsEditing(true);
        setBookForm(book);
        setEditId(book._id);
    };

    return (
        <div>
            <h1>Online Library</h1>
            <div>
                <h2>{isEditing ? 'Edit Book' : 'Add Book'}</h2>
                <input
                    type="text"
                    value={bookForm.booktitle}
                    onChange={(e) => setBookForm({ ...bookForm, booktitle: e.target.value })}
                    placeholder="Book Title"
                />
                <input
                    type="number"
                    value={bookForm.PubYear}
                    onChange={(e) => setBookForm({ ...bookForm, PubYear: e.target.value })}
                    placeholder="Publication Year"
                />
                <input
                    type="text"
                    value={bookForm.author}
                    onChange={(e) => setBookForm({ ...bookForm, author: e.target.value })}
                    placeholder="Author"
                />
                <input
                    type="text"
                    value={bookForm.Topic}
                    onChange={(e) => setBookForm({ ...bookForm, Topic: e.target.value })}
                    placeholder="Topic"
                />
                <input
                    type="text"
                    value={bookForm.formate}
                    onChange={(e) => setBookForm({ ...bookForm, formate: e.target.value })}
                    placeholder="Format (e.g., Electronic or Hard Copy)"
                />
                {isEditing ? (
                    <button onClick={handleUpdateBook}>Update Book</button>
                ) : (
                    <button onClick={handleAddBook}>Add Book</button>
                )}
            </div>

            <h2>Books</h2>
            <ul>
                {books.map((book) => (
                    <li key={book._id}>
                        <span>{book.booktitle} ({book.PubYear})</span>
                        <button onClick={() => handleEditBook(book)}>Edit</button>
                        <button onClick={() => handleDeleteBook(book._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
