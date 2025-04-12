import {useEffect, useState} from "react";
import useBookSearch from "../hooks/useBookSearch";
import SearchBar from "./SearchBar";
import BookList from "./BookList";
import BookModal from "./BookModal";
import DarkModeToggle from "./DarkModeToggle";
import Pagination from "./Pagination";
import ScrollToTopButton from "./ScrollToTopButton";

export default function BookSearchApp() {
    const [query, setQuery] = useState("");
    const [page, setPage] = useState(1);
    const [selectedBook, setSelectedBook] = useState(null);
    const [darkMode, setDarkMode] = useState(false);
    const [showScrollTop, setShowScrollTop] = useState(false);

    const {loading, books, fetchBooks} = useBookSearch();

    // Fetch books whenever 'page' changes, but only if there's a query
    useEffect(() => {
        if (query) {
            fetchBooks(query, page);
        }
    }, [page]);

    // Handle scroll to show/hide "Scroll to Top" button
    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 100);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Triggers a fresh search (page reset to 1)
    const handleSearch = () => {
        setPage(1);
        fetchBooks(query, 1);
    };

    // Reset everything to initial
    const resetToMain = () => {
        setQuery("");
        setPage(1);
        setSelectedBook(null);
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
                        <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch}/>
                    </div>
                </div>

                {/* Book Modal */}
                <BookModal selectedBook={selectedBook} onClose={() => setSelectedBook(null)}/>

                {/* Loading State */}
                {loading ? (
                    <div className="flex justify-center my-6">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : (
                    /* Book List */
                    <BookList books={books} onSelectBook={setSelectedBook}/>
                )}

                {/* Pagination */}
                <Pagination page={page} setPage={setPage}/>

            </div>

            {/* Scroll to Top Button */}
            <ScrollToTopButton showScrollTop={showScrollTop}/>
        </div>
    );
}
