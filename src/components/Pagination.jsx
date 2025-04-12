export default function Pagination({page, setPage}) {
    return (
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
    );
}
