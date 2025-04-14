# Open Library Book Search (Assignment 1 - COM4381)

This project is developed as part of **Assignment 1** for the course *Web Services Technologies (COM4381)*, 2nd Semester 2024/2025.

It demonstrates how to consume and interact with external **RESTful APIs** using modern frontend technologies, specifically the **Open Library API**, **Quotable API**, and **Gemini Flash 2.0 API**.

---

## 👥 Group Members

- [**Yazan Jamhour** ](https://github.com/jamhour1g)
- [**Amro Tariq** ](https://github.com/Amro192)
- [**Belal Hamdeh** ](https://github.com/Hamdeh-Belal)

---

## 🔗 APIs Used

- **Open Library API**  
  [https://openlibrary.org/developers/api](https://openlibrary.org/developers/api)

- **Quotable API**  
  [https://api.quotable.io/quotes/random](https://api.quotable.io/quotes/random)

- **Gemini Flash 2.0 API**  
  [Gemini API](https://generativelanguage.googleapis.com)

---

## 🎯 Project Description

This web application allows users to search for books by title, author, or subject using the Open Library API. The app retrieves data via RESTful endpoints, demonstrates core REST principles, and presents the results in an interactive and user-friendly interface built with React and Tailwind CSS. Additionally, it integrates the **Gemini Flash 2.0 API** to generate AI-based summaries for selected books, and the **Quotable API** to display random inspirational quotes.

**Core Features:**

- Book search with pagination
- Clickable book cards to view detailed info (authors, year, subjects, cover)
- Integration with Internet Archive links to "Read this book"
- AI-generated book summaries from the **Gemini Flash 2.0 API**
- Random inspirational quotes from the **Quotable API**
- Light/Dark mode toggle
- Responsive design
- Back-to-top button
- REST principles demonstrated: `GET` method, query parameters, resource representation (JSON)

## 🚀 How to Run

### 1. Clone the Repository
```bash
git clone https://github.com/Amro192/Book-Discovery.git
cd assignment1
npm install
npm run dev
