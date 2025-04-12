export default function SearchBar({query, setQuery, onSearch}) {
    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch();
    };

    return (
        <form onSubmit={handleSubmit} className="flex justify-center gap-2">
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
    );
}
