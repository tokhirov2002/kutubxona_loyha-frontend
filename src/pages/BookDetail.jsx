"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useBooks } from "../context/BookContext"
import { useAuth } from "../context/AuthContext"

const BookDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { books, savedBooks, saveBook, unsaveBook } = useBooks()
  const { user } = useAuth()

  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("description")
  const [userRating, setUserRating] = useState(0)
  const [userReview, setUserReview] = useState("")
  const [reviews, setReviews] = useState([])
  const [showReviewForm, setShowReviewForm] = useState(false)

  useEffect(() => {
    const foundBook = books.find((b) => b.id === Number.parseInt(id))
    if (foundBook) {
      setBook(foundBook)
      // Mock reviews
      setReviews([
        {
          id: 1,
          user: "Ahmad Karimov",
          rating: 5,
          comment: "Juda ajoyib kitob! Tavsiya qilaman.",
          date: "2024-01-15",
          avatar: "👨‍💼",
        },
        {
          id: 2,
          user: "Malika Tosheva",
          rating: 4,
          comment: "Yaxshi yozilgan, lekin ba'zi qismlar murakkab.",
          date: "2024-01-10",
          avatar: "👩‍🎓",
        },
        {
          id: 3,
          user: "Bobur Aliyev",
          rating: 5,
          comment: "Har bir sahifasi qiziqarli. Mukammal!",
          date: "2024-01-05",
          avatar: "👨‍🎨",
        },
      ])
    }
    setLoading(false)
  }, [id, books])

  const isSaved = savedBooks.includes(Number.parseInt(id))

  const handleSaveToggle = () => {
    if (!user) {
      alert("Kitobni saqlash uchun tizimga kiring")
      return
    }

    if (isSaved) {
      unsaveBook(Number.parseInt(id))
    } else {
      saveBook(Number.parseInt(id))
    }
  }

  const handleDownload = (format) => {
    if (!user) {
      alert("Yuklab olish uchun tizimga kiring")
      return
    }
    alert(`${format} formatida yuklab olinmoqda...`)
  }

  const handleReviewSubmit = (e) => {
    e.preventDefault()
    if (!user) {
      alert("Izoh qoldirish uchun tizimga kiring")
      return
    }

    if (userRating === 0) {
      alert("Iltimos, baho bering")
      return
    }

    const newReview = {
      id: Date.now(),
      user: user.name,
      rating: userRating,
      comment: userReview,
      date: new Date().toISOString().split("T")[0],
      avatar: "👤",
    }

    setReviews([newReview, ...reviews])
    setUserRating(0)
    setUserReview("")
    setShowReviewForm(false)
    alert("Izohingiz qo'shildi!")
  }

  const renderStars = (rating, interactive = false, onRate = null) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <button
          key={i}
          onClick={() => interactive && onRate && onRate(i)}
          className={`text-2xl ${interactive ? "hover:scale-110 transition-transform cursor-pointer" : "cursor-default"} ${
            i <= rating ? "text-yellow-400" : "text-gray-300"
          }`}
          disabled={!interactive}
        >
          ⭐
        </button>,
      )
    }
    return stars
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin text-6xl">📚</div>
      </div>
    )
  }

  if (!book) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">❌</div>
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-4">Kitob topilmadi</h2>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Bosh sahifaga qaytish
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
      >
        <span>←</span>
        <span>Orqaga</span>
      </button>

      {/* Book Header */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="md:flex">
          {/* Book Cover */}
          <div className="md:w-1/3 p-8">
            <div className="relative group">
              <img
                src={book.cover || "/placeholder.svg"}
                alt={book.title}
                className="w-full max-w-sm mx-auto rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 rounded-xl"></div>
            </div>
          </div>

          {/* Book Info */}
          <div className="md:w-2/3 p-8 space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-2">{book.title}</h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
                {book.author} • {book.year}
              </p>

              {/* Rating */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {renderStars(book.rating)}
                  <span className="text-lg font-semibold text-gray-700 dark:text-gray-300 ml-2">{book.rating}</span>
                </div>
                <span className="text-gray-500 dark:text-gray-500">({book.reviews} ta izoh)</span>
              </div>

              {/* Book Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-2xl mb-1">📄</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Sahifalar</div>
                  <div className="font-semibold text-gray-800 dark:text-white">{book.pages}</div>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-2xl mb-1">🏷️</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Kategoriya</div>
                  <div className="font-semibold text-gray-800 dark:text-white">{book.category}</div>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-2xl mb-1">🌐</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Til</div>
                  <div className="font-semibold text-gray-800 dark:text-white">{book.language}</div>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-2xl mb-1">⬇️</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Yuklab olingan</div>
                  <div className="font-semibold text-gray-800 dark:text-white">
                    {book.downloadCount.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => handleDownload("PDF")}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
              >
                <span>📖</span>
                <span>O'qish</span>
              </button>

              {book.format.map((format) => (
                <button
                  key={format}
                  onClick={() => handleDownload(format)}
                  className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
                >
                  <span>⬇️</span>
                  <span>{format} yuklab olish</span>
                </button>
              ))}

              <button
                onClick={handleSaveToggle}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                  isSaved
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
                }`}
              >
                <span>{isSaved ? "❤️" : "🤍"}</span>
                <span>{isSaved ? "Saqlangan" : "Saqlash"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="border-b dark:border-gray-700">
          <nav className="flex space-x-8 px-8">
            {[
              { id: "description", label: "Tavsif", icon: "📝" },
              { id: "reviews", label: "Izohlar", icon: "💬" },
              { id: "details", label: "Batafsil", icon: "ℹ️" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 border-b-2 font-medium transition-colors ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600 dark:text-blue-400"
                    : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-8">
          {activeTab === "description" && (
            <div className="animate-fade-in">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Kitob haqida</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">{book.description}</p>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="animate-fade-in space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">Izohlar ({reviews.length})</h3>
                <button
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Izoh qoldirish
                </button>
              </div>

              {showReviewForm && (
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl animate-scale-in">
                  <form onSubmit={handleReviewSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Baho bering:
                      </label>
                      <div className="flex space-x-1">{renderStars(userRating, true, setUserRating)}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Izohingiz:
                      </label>
                      <textarea
                        value={userReview}
                        onChange={(e) => setUserReview(e.target.value)}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Kitob haqidagi fikringizni yozing..."
                        required
                      />
                    </div>
                    <div className="flex space-x-3">
                      <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                      >
                        Yuborish
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowReviewForm(false)}
                        className="bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-300 px-6 py-2 rounded-lg font-medium transition-colors"
                      >
                        Bekor qilish
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
                    <div className="flex items-start space-x-4">
                      <div className="text-3xl">{review.avatar}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-800 dark:text-white">{review.user}</h4>
                          <span className="text-sm text-gray-500 dark:text-gray-400">{review.date}</span>
                        </div>
                        <div className="flex items-center space-x-1 mb-2">{renderStars(review.rating)}</div>
                        <p className="text-gray-600 dark:text-gray-400">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "details" && (
            <div className="animate-fade-in">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Batafsil ma'lumot</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex justify-between py-2 border-b dark:border-gray-600">
                    <span className="text-gray-600 dark:text-gray-400">Sarlavha:</span>
                    <span className="font-medium text-gray-800 dark:text-white">{book.title}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b dark:border-gray-600">
                    <span className="text-gray-600 dark:text-gray-400">Muallif:</span>
                    <span className="font-medium text-gray-800 dark:text-white">{book.author}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b dark:border-gray-600">
                    <span className="text-gray-600 dark:text-gray-400">Nashr yili:</span>
                    <span className="font-medium text-gray-800 dark:text-white">{book.year}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b dark:border-gray-600">
                    <span className="text-gray-600 dark:text-gray-400">Kategoriya:</span>
                    <span className="font-medium text-gray-800 dark:text-white">{book.category}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between py-2 border-b dark:border-gray-600">
                    <span className="text-gray-600 dark:text-gray-400">Sahifalar soni:</span>
                    <span className="font-medium text-gray-800 dark:text-white">{book.pages}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b dark:border-gray-600">
                    <span className="text-gray-600 dark:text-gray-400">Til:</span>
                    <span className="font-medium text-gray-800 dark:text-white">{book.language}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b dark:border-gray-600">
                    <span className="text-gray-600 dark:text-gray-400">Formatlar:</span>
                    <span className="font-medium text-gray-800 dark:text-white">{book.format.join(", ")}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b dark:border-gray-600">
                    <span className="text-gray-600 dark:text-gray-400">Yuklab olingan:</span>
                    <span className="font-medium text-gray-800 dark:text-white">
                      {book.downloadCount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BookDetail
