"use client"

import { createContext, useContext, useState, useEffect } from "react"

const BookContext = createContext()

export const useBooks = () => {
  const context = useContext(BookContext)
  if (!context) {
    throw new Error("useBooks must be used within a BookProvider")
  }
  return context
}

// Mock kitoblar ma'lumotlari
const initialBooks = [
  {
    id: 1,
    title: "O'tkan kunlar",
    author: "Abdulla Qodiriy",
    category: "Adabiyot",
    year: 1925,
    description: "O'zbek adabiyotining eng mashhur asarlaridan biri. Tarixiy roman.",
    cover: "/placeholder.svg?height=300&width=200",
    rating: 4.8,
    reviews: 156,
    pages: 320,
    language: "O'zbek",
    format: ["PDF", "EPUB"],
    downloadCount: 2340,
  },
  {
    id: 2,
    title: "Mehrobdan chayon",
    author: "Abdulla Qodiriy",
    category: "Adabiyot",
    year: 1922,
    description: "Ijtimoiy-maishiy roman. O'zbek xalqining hayoti tasvirlangan.",
    cover: "/placeholder.svg?height=300&width=200",
    rating: 4.6,
    reviews: 89,
    pages: 280,
    language: "O'zbek",
    format: ["PDF"],
    downloadCount: 1890,
  },
  {
    id: 3,
    title: "Sarob",
    author: "Abdulla Qahhor",
    category: "Adabiyot",
    year: 1960,
    description: "Zamonaviy o'zbek adabiyotining eng yaxshi namunalaridan.",
    cover: "/placeholder.svg?height=300&width=200",
    rating: 4.7,
    reviews: 234,
    pages: 256,
    language: "O'zbek",
    format: ["PDF", "EPUB"],
    downloadCount: 3120,
  },
  {
    id: 4,
    title: "Algoritm va ma'lumotlar strukturasi",
    author: "Thomas H. Cormen",
    category: "Texnologiya",
    year: 2009,
    description: "Dasturlash va kompyuter fanlari bo'yicha fundamental kitob.",
    cover: "/placeholder.svg?height=300&width=200",
    rating: 4.9,
    reviews: 445,
    pages: 1312,
    language: "Ingliz",
    format: ["PDF"],
    downloadCount: 5670,
  },
  {
    id: 5,
    title: "O'zbekiston tarixi",
    author: "Aziz Kayumov",
    category: "Tarix",
    year: 2018,
    description: "O'zbekiston xalqlarining boy tarixi haqida to'liq ma'lumot.",
    cover: "/placeholder.svg?height=300&width=200",
    rating: 4.5,
    reviews: 178,
    pages: 450,
    language: "O'zbek",
    format: ["PDF", "EPUB"],
    downloadCount: 2890,
  },
  {
    id: 6,
    title: "Fizika asoslari",
    author: "Richard Feynman",
    category: "Fan",
    year: 1963,
    description: "Fizika fanining asosiy qonunlari va printsiplari.",
    cover: "/placeholder.svg?height=300&width=200",
    rating: 4.8,
    reviews: 567,
    pages: 890,
    language: "Ingliz",
    format: ["PDF"],
    downloadCount: 4230,
  },
]

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([])
  const [savedBooks, setSavedBooks] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Barchasi")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock API call
    setTimeout(() => {
      setBooks(initialBooks)
      setLoading(false)
    }, 1000)

    // Saqlangan kitoblarni yuklash
    const saved = localStorage.getItem("savedBooks")
    if (saved) {
      setSavedBooks(JSON.parse(saved))
    }
  }, [])

  const addBook = (book) => {
    const newBook = {
      ...book,
      id: Date.now(),
      rating: 0,
      reviews: 0,
      downloadCount: 0,
    }
    setBooks((prev) => [...prev, newBook])
  }

  const updateBook = (id, updatedBook) => {
    setBooks((prev) => prev.map((book) => (book.id === id ? { ...book, ...updatedBook } : book)))
  }

  const deleteBook = (id) => {
    setBooks((prev) => prev.filter((book) => book.id !== id))
  }

  const saveBook = (bookId) => {
    if (!savedBooks.includes(bookId)) {
      const newSavedBooks = [...savedBooks, bookId]
      setSavedBooks(newSavedBooks)
      localStorage.setItem("savedBooks", JSON.stringify(newSavedBooks))
    }
  }

  const unsaveBook = (bookId) => {
    const newSavedBooks = savedBooks.filter((id) => id !== bookId)
    setSavedBooks(newSavedBooks)
    localStorage.setItem("savedBooks", JSON.stringify(newSavedBooks))
  }

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "Barchasi" || book.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const categories = ["Barchasi", ...new Set(books.map((book) => book.category))]

  const value = {
    books,
    savedBooks,
    filteredBooks,
    categories,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    loading,
    addBook,
    updateBook,
    deleteBook,
    saveBook,
    unsaveBook,
  }

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>
}
