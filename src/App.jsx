"use client"

import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Home from "./pages/Home"
import BookDetail from "./pages/BookDetail"
import SavedBooks from "./pages/SavedBooks"
import Login from "./pages/Login"
import AdminPanel from "./pages/AdminPanel"
import { AuthProvider } from "./context/AuthContext"
import { BookProvider } from "./context/BookContext"
import "./App.css"

function App() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode")
    if (savedTheme) {
      setDarkMode(JSON.parse(savedTheme))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode))
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  return (
    <AuthProvider>
      <BookProvider>
        <Router>
          <div
            className={`min-h-screen transition-colors duration-300 ${darkMode ? "dark bg-gray-900" : "bg-gray-50"}`}
          >
            <Header darkMode={darkMode} setDarkMode={setDarkMode} />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/book/:id" element={<BookDetail />} />
                <Route path="/saved" element={<SavedBooks />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin" element={<AdminPanel />} />
              </Routes>
            </main>
          </div>
        </Router>
      </BookProvider>
    </AuthProvider>
  )
}

export default App


// SALOM sanjm;odsoafhnsag  ,mfblbhflhwe;orfwe;rf;ew