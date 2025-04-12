export default function BookItem({book, onClick}) {
    return (
        <div
            onClick={onClick}
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
    );
}
