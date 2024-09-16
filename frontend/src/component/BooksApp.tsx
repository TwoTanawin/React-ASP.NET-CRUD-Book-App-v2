import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Book {
  id: number;
  title: string;
  author: string;
}

const BooksApp: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [newBook, setNewBook] = useState<Book>({ id: 0, title: '', author: '' });
  const [editBook, setEditBook] = useState<Book | null>(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/Books');
      setBooks(response.data);
    } catch (error) {
      toast.error('Error fetching books');
    }
  };

  const addBook = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/Books', newBook);
      setBooks([...books, response.data]);
      setNewBook({ id: 0, title: '', author: '' });
      toast.success('Book added successfully');
    } catch (error) {
      toast.error('Error adding book');
    }
  };

  const updateBook = async (book: Book) => {
    try {
      await axios.put(`http://localhost:8080/api/Books/${book.id}`, book);
      setBooks(books.map((b) => (b.id === book.id ? book : b)));
      setEditBook(null);
      toast.success('Book updated successfully');
    } catch (error) {
      toast.error('Error updating book');
    }
  };

  const deleteBook = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/api/Books/${id}`);
      setBooks(books.filter((book) => book.id !== id));
      toast.success('Book deleted successfully');
    } catch (error) {
      toast.error('Error deleting book');
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Books List</h1>

      <div className="mb-4">
        <input
          type="text"
          className="border rounded p-2 mr-2"
          placeholder="Book Title"
          value={newBook.title}
          onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
        />
        <input
          type="text"
          className="border rounded p-2 mr-2"
          placeholder="Author"
          value={newBook.author}
          onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={addBook}
        >
          Add Book
        </button>
      </div>

      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Title</th>
            <th className="py-2 px-4 border-b">Author</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td className="py-2 px-4 border-b">{book.id}</td>
              <td className="py-2 px-4 border-b">{book.title}</td>
              <td className="py-2 px-4 border-b">{book.author}</td>
              <td className="py-2 px-4 border-b">
                {editBook && editBook.id === book.id ? (
                  <>
                    <input
                      type="text"
                      value={editBook.title}
                      onChange={(e) =>
                        setEditBook({ ...editBook, title: e.target.value })
                      }
                      className="border rounded p-1 mr-2"
                    />
                    <input
                      type="text"
                      value={editBook.author}
                      onChange={(e) =>
                        setEditBook({ ...editBook, author: e.target.value })
                      }
                      className="border rounded p-1 mr-2"
                    />
                    <button
                      className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                      onClick={() => updateBook(editBook)}
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                      onClick={() => setEditBook(book)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => deleteBook(book.id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
};

export default BooksApp;
