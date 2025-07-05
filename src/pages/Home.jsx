"use client"

import { useState, useEffect } from "react"
import { useBooks } from "../context/BookContext"
import BookCard from "../components/BookCard"
import SearchBar from "../components/SearchBar"
import CategoryFilter from "../components/CategoryFilter"
import LoadingSpinner from "../components/LoadingSpinner"

const Home = () => {
  const { filteredBooks, loading } = useBooks()
  const [animateCards, setAnimateCards] = useState(false)

  useEffect(() => {
    if (!loading) {
      setTimeout(() => setAnimateCards(true), 100)
    }
  }, [loading])

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center py-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white shadow-xl">
        <div className="animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">📚 Elektron Kutubxona</h1>
          <p className="text-xl md:text-2xl opacity-90 mb-8">
            Minglab kitoblar bir joyda - o'qing, yuklab oling, baham ko'ring
          </p>
          <div className="flex justify-center space-x-8 text-sm md:text-base">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">📖</span>
              <span>Bepul o'qish</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">⬇️</span>
              <span>Yuklab olish</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">⭐</span>
              <span>Baholash</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="space-y-4">
        <SearchBar />
        <CategoryFilter />
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center transform hover:scale-105 transition-transform">
          <div className="text-3xl mb-2">📚</div>
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{filteredBooks.length}</div>
          <div className="text-gray-600 dark:text-gray-400">Kitoblar</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center transform hover:scale-105 transition-transform">
          <div className="text-3xl mb-2">👥</div>
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">1,234</div>
          <div className="text-gray-600 dark:text-gray-400">Foydalanuvchilar</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center transform hover:scale-105 transition-transform">
          <div className="text-3xl mb-2">⬇️</div>
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">25,678</div>
          <div className="text-gray-600 dark:text-gray-400">Yuklab olingan</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center transform hover:scale-105 transition-transform">
          <div className="text-3xl mb-2">⭐</div>
          <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">4.8</div>
          <div className="text-gray-600 dark:text-gray-400">O'rtacha baho</div>
        </div>
      </div>

      {/* Books Grid */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Kitoblar katalogi ({filteredBooks.length})</h2>

        {filteredBooks.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">Kitob topilmadi</h3>
            <p className="text-gray-500 dark:text-gray-500">
              Qidiruv so'zini o'zgartiring yoki boshqa kategoriyani tanlang
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBooks.map((book, index) => (
              <div
                key={book.id}
                className={`transform transition-all duration-500 ${
                  animateCards ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <BookCard book={book} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
