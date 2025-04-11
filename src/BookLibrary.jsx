import { useEffect, useState } from "react";
import axios from "axios";

export default function BookSearchApp() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);



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

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 100); // Show button if scrolled more than 100px
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


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
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white p-4 font-sans">

        <div className="flex justify-end mb-2">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-sm text-blue-600 hover:underline"
          >
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>

        <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 text-black dark:text-white py-4 shadow-md mb-4 rounded-2xl mx-2">
          <div className="max-w-3xl mx-auto text-center">
            <h1
              onClick={resetToMain}
              className="text-3xl font-bold text-blue-700 mb-3 cursor-pointer hover:underline"
            >
              Open Library Book Search
            </h1>

            <form onSubmit={handleSearch} className="flex justify-center gap-2">
              <input
                type="text"
                className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white rounded-l px-4 py-2 w-1/2"
                placeholder="Search books by title, author, or subject"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-4 py-2 rounded-r"
              >
                Search
              </button>
            </form>
          </div>
        </div>

        {selectedBook && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg max-w-lg w-full relative">
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
              <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                {selectedBook.title}
              </h2>
              <p className="mb-1 text-sm text-gray-700 dark:text-gray-300">Authors: {selectedBook.author_name?.join(", ")}</p>
              <p className="mb-1 text-sm text-gray-600 dark:text-gray-400">First Published: {selectedBook.first_publish_year}</p>
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
          <p className="text-center"><div className="flex justify-center my-6">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div></p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {books.map((book, index) => (
              <div
                key={index}
                onClick={() => setSelectedBook(book)}
                className="bg-white dark:bg-gray-800 p-4 shadow rounded cursor-pointer hover:shadow-lg hover:scale-[1.02] transition transform duration-300"
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
            className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-black dark:text-white px-4 py-2 rounded"
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            disabled={page === 1}
          >
            Previous
          </button>
          <span className="self-center">Page {page}</span>
          <button
            className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-black dark:text-white px-4 py-2 rounded"
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      </div>
      {books.length > 0 && showScrollTop && (
        <button
          title="Back to Top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition"
        >
          ⬆️
        </button>

      )}

    </div>
  );
}