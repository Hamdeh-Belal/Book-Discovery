import QuoteBanner from "./QuoteBanner";

export default function WelcomeBanner() {
  return (
    <div className="flex flex-col justify-between h-[calc(100vh-200px)] text-center px-4">
      {/* Top Section */}
      <div className="flex flex-col items-center mt-9">
        <img
          src="https://openmoji.org/data/color/svg/1F4D6.svg"
          alt="book icon"
          className="w-20 h-20 mb-4 animate-bounce"
        />
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
          Welcome to Open Library Search!
        </h2>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Start by searching for a book, author, or subject. Try something like:
        </p>
        <p className="mt-1 italic text-blue-600 dark:text-blue-400">
          “Harry Potter”, “Artificial Intelligence”, “Palestine”
        </p>
      </div>

      {/* Bottom Quote */}
      <QuoteBanner />
    </div>
  );
}
