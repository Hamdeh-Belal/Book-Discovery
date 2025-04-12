import {useState} from "react";
import axios from "axios";

export default function useBookSearch() {
    const [loading, setLoading] = useState(false);
    const [books, setBooks] = useState([]);
    const [error, setError] = useState(null);

    const fetchBooks = async (query, page) => {
        if (!query) return;
        setLoading(true);
        setError(null);

        try {
            const res = await axios.get(
                `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&page=${page}`
            );
            setBooks(res.data.docs);
        } catch (err) {
            console.error("Error fetching books:", err);
            setError(err);
            setBooks([]);
        }
        setLoading(false);
    };

    return {loading, books, error, fetchBooks, setBooks};
}
