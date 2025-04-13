export default function SearchBar({query, setQuery, onSearch, filter, setFilter}) {
    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch();
    };

    return (
        <form onSubmit={handleSubmit} className="flex justify-center flex-wrap gap-2">
            <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded"
            >
                <option value="q">All</option>
                <option value="title">Title</option>
                <option value="author">Author</option>
                <option value="subject">Subject</option>
            </select>

            <input
                type="text"
                className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white rounded px-4 py-2 w-1/2"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />

            <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
                Search
            </button>
        </form>
    );
}
