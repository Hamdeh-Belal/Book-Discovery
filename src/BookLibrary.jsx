import { useEffect, useState } from "react";
import axios from "axios";

export default function BookSearchApp() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const fetchBooks = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const res = await axios.get(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&page=${page}`
      );
      setBooks(res.data.docs);
    } catch (error) {
      console.error("Error fetching books:", error);
      setBooks([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBooks();
  }, [page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchBooks();
  };

  const resetToMain = () => {
    setQuery("");
    setBooks([]);
    setPage(1);
    setSelectedBook(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 font-sans">
      <h1
        onClick={resetToMain}
        className="text-3xl font-bold text-center mb-6 cursor-pointer text-blue-700 hover:underline"
      >
        Open Library Book Search
      </h1>

      <form onSubmit={handleSearch} className="flex justify-center mb-4">
        <input
          type="text"
          className="border border-gray-300 rounded-l px-4 py-2 w-1/2"
          placeholder="Search books by title, author, or subject"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      {selectedBook && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full relative">
            <button
              onClick={() => setSelectedBook(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              ✕
            </button>
            {selectedBook.cover_i ? (
              <img
                src={`https://covers.openlibrary.org/b/id/${selectedBook.cover_i}-L.jpg`}
                alt={selectedBook.title}
                className="mb-4 w-full h-64 object-contain rounded"
              />
            ) : (
              <div className="bg-gray-200 mb-4 w-full h-64 flex items-center justify-center rounded">
                <span className="text-gray-500 text-sm">No Cover Available</span>
              </div>
            )}
            <h2 className="text-2xl font-bold mb-2">{selectedBook.title}</h2>
            <p className="mb-1 text-sm text-gray-700">Authors: {selectedBook.author_name?.join(", ")}</p>
            <p className="mb-1 text-sm text-gray-600">First Published: {selectedBook.first_publish_year}</p>
            {selectedBook.subject && selectedBook.subject.length > 0 && (
              <p className="mb-1 text-sm text-gray-600">
                Subjects: {selectedBook.subject.slice(0, 5).join(", ")}
              </p>
            )}
            {selectedBook.ia && (
              <a
                href={`https://archive.org/details/${selectedBook.ia[0]}`}
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-3 text-blue-600 hover:underline"
              >
                Read this book
              </a>
            )}
          </div>
        </div>
      )}

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {books.map((book, index) => (
            <div
              key={index}
              onClick={() => setSelectedBook(book)}
              className="bg-white p-4 shadow rounded cursor-pointer hover:shadow-md transition"
            >
              {book.cover_i ? (
                <img
                  src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                  alt={book.title}
                  className="mb-2 w-full h-48 object-cover rounded"
                />
              ) : (
                <div className="bg-gray-200 mb-2 w-full h-48 flex items-center justify-center rounded">
                  <span className="text-gray-500 text-sm">No Cover</span>
                </div>
              )}
              <h2 className="font-bold text-lg">{book.title}</h2>
              <p className="text-sm text-gray-700">{book.author_name?.join(", ")}</p>
              <p className="text-sm text-gray-500">First published: {book.first_publish_year}</p>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-center gap-4 mt-6">
        <button
          className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
          onClick={() => setPage((prev) => Math.max(1, prev - 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="self-center">Page {page}</span>
        <button
          className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}