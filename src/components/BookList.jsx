import BookItem from "./BookItem";

export default function BookList({books, onSelectBook}) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {books.map((book, index) => (
                <BookItem
                    key={index}
                    book={book}
                    onClick={() => onSelectBook(book)}
                />
            ))}
        </div>
    );
}
