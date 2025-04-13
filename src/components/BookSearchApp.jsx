import {useEffect, useState} from "react";
import useBookSearch from "../hooks/useBookSearch";
import SearchBar from "./SearchBar";
import BookList from "./BookList";
import BookModal from "./BookModal";
import DarkModeToggle from "./DarkModeToggle";
import Pagination from "./Pagination";
import ScrollToTopButton from "./ScrollToTopButton";
import WelcomeBanner from "./WelcomeBanner";
import useDarkMode from "../hooks/useDarkMode.js";
import LoadingSpinner from "./LoadingSpinner.jsx";

function renderMainContent({
                               loading,
                               hasQuery,
                               books,
                               setSelectedBook
                           }) {
    if (loading) {
        return <LoadingSpinner/>;
    } else if (!hasQuery) {
        return <WelcomeBanner/>;
    } else if (books.length > 0) {
        return <BookList books={books} onSelectBook={setSelectedBook}/>;
    } else {
        return (
            <p className="text-center text-gray-500 mt-8 text-lg">
                🔍 No books found. Try another keyword!
            </p>
        );
    }
}

export default function BookSearchApp() {
    const [filter, setFilter] = useState("q"); // q = all fields
    const [query, setQuery] = useState("");
    const [page, setPage] = useState(1);
    const [selectedBook, setSelectedBook] = useState(null);
    const [darkMode, setDarkMode] = useDarkMode();
    const {loading, books, fetchBooks, setBooks} = useBookSearch();

    // Fetch books whenever 'page' changes, but only if there's a query
    useEffect(() => {
        if (query) {
            fetchBooks(query, page, filter);
        }
    }, [page]);

    // Triggers a fresh search (page reset to 1)
    const handleSearch = () => {
        setPage(1);
        fetchBooks(query, 1, filter);
    };

    const resetToMain = () => {
        setQuery("");
        setPage(1);
        setSelectedBook(null);
        setBooks([]);
    };

    return (
        <div className={darkMode ? "dark" : ""}>
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white p-4 font-sans">

                {/* Dark Mode Toggle */}
                <div className="flex justify-end mb-2">
                    <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode}/>
                </div>

                {/* Header */}
                <div
                    className="sticky top-0 z-10 bg-white dark:bg-gray-800 text-black dark:text-white py-4 shadow-md mb-4 rounded-2xl mx-2">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1
                            onClick={resetToMain}
                            className="text-3xl font-bold text-blue-700 mb-3 cursor-pointer hover:underline"
                        >
                            Open Library Book Search
                        </h1>

                        {/* Search Bar */}
                        <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} filter={filter}
                                   setFilter={setFilter}/>
                    </div>
                </div>

                {/* Book Modal */}
                <BookModal selectedBook={selectedBook} onClose={() => setSelectedBook(null)}/>

                {renderMainContent({
                    loading,
                    hasQuery: query,
                    books,
                    setSelectedBook
                })}

                {/* Pagination: only show if we have search results */}
                {books.length > 0 && <Pagination page={page} setPage={setPage}/>}
            </div>

            <ScrollToTopButton/>
        </div>
    );
}
