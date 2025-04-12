export default function BookModal({selectedBook, onClose}) {
    if (!selectedBook) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg max-w-lg w-full relative">
                <button
                    onClick={onClose}
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
                <p className="mb-1 text-sm text-gray-700 dark:text-gray-300">
                    Authors: {selectedBook.author_name?.join(", ")}
                </p>
                <p className="mb-1 text-sm text-gray-600 dark:text-gray-400">
                    First Published: {selectedBook.first_publish_year}
                </p>
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
    );
}
