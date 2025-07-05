"use client"

import { useEffect, useState } from "react"
import { useBooks } from "../context/BookContext"
import { useAuth } from "../context/AuthContext"
import BookCard from "../components/BookCard"
import { Link } from "react-router-dom"

const SavedBooks = () => {
  const { books, savedBooks } = useBooks()
  const { user } = useAuth()
  const [savedBooksData, setSavedBooksData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (books.length > 0) {
      const filteredBooks = books.filter((book) => savedBooks.includes(book.id))
      setSavedBooksData(filteredBooks)
      setLoading(false)
    }
  }, [books, savedBooks])

  if (!user) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🔒</div>
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-4">Tizimga kirish talab qilinadi</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">Saqlangan kitoblarni ko'rish uchun tizimga kiring</p>
        <Link
          to="/login"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-block"
        >
          Tizimga kirish
        </Link>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin text-6xl mb-4">📚</div>
          <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300">Yuklanmoqda...</h2>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">💾 Saqlangan kitoblar</h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">Siz saqlagan barcha kitoblar bu yerda</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center transform hover:scale-105 transition-transform">
          <div className="text-4xl mb-2">📚</div>
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{savedBooksData.length}</div>
          <div className="text-gray-600 dark:text-gray-400">Saqlangan kitoblar</div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center transform hover:scale-105 transition-transform">
          <div className="text-4xl mb-2">📖</div>
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {savedBooksData.reduce((total, book) => total + book.pages, 0).toLocaleString()}
          </div>
          <div className="text-gray-600 dark:text-gray-400">Jami sahifalar</div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center transform hover:scale-105 transition-transform">
          <div className="text-4xl mb-2">⭐</div>
          <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
            {savedBooksData.length > 0
              ? (savedBooksData.reduce((total, book) => total + book.rating, 0) / savedBooksData.length).toFixed(1)
              : "0.0"}
          </div>
          <div className="text-gray-600 dark:text-gray-400">O'rtacha baho</div>
        </div>
      </div>

      {/* Books Grid */}
      {savedBooksData.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📭</div>
          <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">Hali kitob saqlanmagan</h3>
          <p className="text-gray-500 dark:text-gray-500 mb-6">
            Yoqtirgan kitoblaringizni saqlang va keyinroq oson toping
          </p>
          <Link
            to="/"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-block"
          >
            Kitoblarni ko'rish
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              Sizning kutubxonangiz ({savedBooksData.length})
            </h2>

            {/* Sort Options */}
            <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>Saqlangan vaqt bo'yicha</option>
              <option>Nom bo'yicha</option>
              <option>Muallif bo'yicha</option>
              <option>Baho bo'yicha</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {savedBooksData.map((book, index) => (
              <div
                key={book.id}
                className="transform transition-all duration-500 translate-y-0 opacity-100"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <BookCard book={book} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      {savedBooksData.length > 0 && (
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Kitoblaringizni boshqaring</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-lg font-medium transition-colors">
              📤 Eksport qilish
            </button>
            <button className="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-lg font-medium transition-colors">
              📊 Statistika
            </button>
            <button className="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-lg font-medium transition-colors">
              🔄 Sinxronlash
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default SavedBooks
