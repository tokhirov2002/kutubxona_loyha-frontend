"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { useBooks } from "../context/BookContext"
import { useAuth } from "../context/AuthContext"

const BookCard = ({ book }) => {
  const { savedBooks, saveBook, unsaveBook } = useBooks()
  const { user } = useAuth()
  const [isHovered, setIsHovered] = useState(false)
  const isSaved = savedBooks.includes(book.id)

  const handleSaveToggle = (e) => {
    e.preventDefault()
    if (!user) {
      alert("Kitobni saqlash uchun tizimga kiring")
      return
    }

    if (isSaved) {
      unsaveBook(book.id)
    } else {
      saveBook(book.id)
    }
  }

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="text-yellow-400">
          ⭐
        </span>,
      )
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="text-yellow-400">
          ⭐
        </span>,
      )
    }

    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="text-gray-300">
          ⭐
        </span>,
      )
    }

    return stars
  }

  return (
    <Link to={`/book/${book.id}`}>
      <div
        className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl ${
          isHovered ? "shadow-2xl" : ""
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Book Cover */}
        <div className="relative overflow-hidden">
          <img
            src={book.cover || "/placeholder.svg"}
            alt={book.title}
            className={`w-full h-64 object-cover transition-transform duration-300 ${
              isHovered ? "scale-110" : "scale-100"
            }`}
          />

          {/* Save Button */}
          <button
            onClick={handleSaveToggle}
            className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-300 ${
              isSaved ? "bg-red-500 text-white" : "bg-white/80 text-gray-600 hover:bg-white"
            } ${isHovered ? "scale-110" : "scale-100"}`}
          >
            {isSaved ? "❤️" : "🤍"}
          </button>

          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">{book.category}</span>
          </div>

          {/* Format Badges */}
          <div className="absolute bottom-3 left-3 flex space-x-1">
            {book.format.map((format) => (
              <span key={format} className="bg-black/70 text-white px-2 py-1 rounded text-xs">
                {format}
              </span>
            ))}
          </div>
        </div>

        {/* Book Info */}
        <div className="p-4 space-y-3">
          <div>
            <h3 className="font-bold text-lg text-gray-800 dark:text-white line-clamp-2 mb-1">{book.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {book.author} • {book.year}
            </p>
          </div>

          {/* Rating */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              {renderStars(book.rating)}
              <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">({book.reviews})</span>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-500">{book.pages} sahifa</div>
          </div>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">{book.description}</p>

          {/* Download Count */}
          <div className="flex items-center justify-between pt-2 border-t dark:border-gray-700">
            <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-500">
              <span>⬇️</span>
              <span>{book.downloadCount.toLocaleString()}</span>
            </div>
            <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">Batafsil →</div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default BookCard
