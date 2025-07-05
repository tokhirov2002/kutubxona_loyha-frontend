"use client"

import { useState } from "react"
import { useBooks } from "../context/BookContext"

const SearchBar = () => {
  const { searchTerm, setSearchTerm } = useBooks()
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className="relative max-w-2xl mx-auto">
      <div className={`relative transition-all duration-300 ${isFocused ? "transform scale-105" : ""}`}>
        <input
          type="text"
          placeholder="Kitob nomi, muallif yoki kalit so'z bo'yicha qidiring..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full px-6 py-4 pl-12 text-lg border-2 border-gray-200 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-all duration-300 shadow-lg"
        />
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
          <span className="text-2xl">🔍</span>
        </div>
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <span className="text-xl">✕</span>
          </button>
        )}
      </div>

      {/* Search suggestions could go here */}
      {searchTerm && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-xl border dark:border-gray-700 z-10">
          <div className="p-4 text-sm text-gray-600 dark:text-gray-400">"{searchTerm}" uchun qidirilmoqda...</div>
        </div>
      )}
    </div>
  )
}

export default SearchBar
