export default function ScrollToTopButton({showScrollTop}) {
    if (!showScrollTop) return null;

    const handleScrollToTop = () => {
        window.scrollTo({top: 0, behavior: "smooth"});
    };

    return (
        <button
            title="Back to Top"
            onClick={handleScrollToTop}
            className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition"
        >
            ⬆️
        </button>
    );
}
