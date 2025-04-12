import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import BookSearchApp from "./components/BookSearchApp.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BookSearchApp/>
    </StrictMode>,
)
