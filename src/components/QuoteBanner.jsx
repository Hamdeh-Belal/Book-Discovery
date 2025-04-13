import {useEffect, useState} from "react";
import axios from "axios";

export default function QuoteBanner() {
    const [quote, setQuote] = useState(null);

    const fetchQuote = async () => {
        try {
            const res = await axios.get("https://api.quotable.io/quotes/random");
            setQuote(res.data);
        } catch (error) {
            console.error("Failed to fetch quote:", error);
            setQuote({
                content: "Stay curious, game smart, code creatively.",
                author: "ChatGPT",
            })
        }
    };

    useEffect(() => {
        fetchQuote();
    }, []);


    if (!quote) return null;

    return (
        <div className="mt-6 max-w-xl mx-auto px-4 text-center">
            <p className="italic text-gray-600 dark:text-gray-400 text-lg">"{quote.content}"</p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">— {quote.author}</p>
        </div>
    );
}
