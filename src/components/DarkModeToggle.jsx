export default function DarkModeToggle({darkMode, setDarkMode}) {
    return (
        <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-sm text-blue-600 hover:underline"
        >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
    );
}
