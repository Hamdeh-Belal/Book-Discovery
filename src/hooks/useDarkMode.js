import {useEffect, useState} from "react";

export default function useDarkMode() {
    const [darkMode, setDarkMode] = useState(false);

    // Load user preference from localStorage on mount
    useEffect(() => {
        const savedMode = localStorage.getItem("darkMode");
        if (savedMode === "true") {
            setDarkMode(true);
        }
    }, []);

    // Whenever darkMode changes, save it in localStorage
    // and update the root "dark" class for Tailwind
    useEffect(() => {
        localStorage.setItem("darkMode", darkMode);
        const root = document.documentElement;
        if (darkMode) {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
    }, [darkMode]);

    return [darkMode, setDarkMode];
}
