"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import { useBooks } from "../context/BookContext"
import { Link } from "react-router-dom"

const AdminPanel = () => {
  const { user } = useAuth()
  const { books, addBook, updateBook, deleteBook } = useBooks()
  const [activeTab, setActiveTab] = useState("dashboard")
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingBook, setEditingBook] = useState(null)
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    year: new Date().getFullYear(),
    description: "",
    pages: "",
    language: "O'zbek",
    format: ["PDF"],
  })
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalUsers: 1234,
    totalDownloads: 0,
    avgRating: 0,
  })

  useEffect(() => {
    if (books.length > 0) {
      setStats({
        totalBooks: books.length,
        totalUsers: 1234,
        totalDownloads: books.reduce((total, book) => total + book.downloadCount, 0),
        avgRating: books.reduce((total, book) => total + book.rating, 0) / books.length,
      })
    }
  }, [books])

  if (!user || user.role !== "admin") {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🚫</div>
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-4">Ruxsat berilmagan</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">Bu sahifaga faqat adminlar kirishi mumkin</p>
        <Link
          to="/"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-block"
        >
          Bosh sahifaga qaytish
        </Link>
      </div>
    )
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFormatChange = (format) => {
    setFormData((prev) => ({
      ...prev,
      format: prev.format.includes(format) ? prev.format.filter((f) => f !== format) : [...prev.format, format],
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const bookData = {
      ...formData,
      pages: Number.parseInt(formData.pages),
      year: Number.parseInt(formData.year),
      cover: "/placeholder.svg?height=300&width=200",
    }

    if (editingBook) {
      updateBook(editingBook.id, bookData)
      setEditingBook(null)
    } else {
      addBook(bookData)
    }

    setFormData({
      title: "",
      author: "",
      category: "",
      year: new Date().getFullYear(),
      description: "",
      pages: "",
      language: "O'zbek",
      format: ["PDF"],
    })
    setShowAddForm(false)
  }

  const handleEdit = (book) => {
    setEditingBook(book)
    setFormData({
      title: book.title,
      author: book.author,
      category: book.category,
      year: book.year,
      description: book.description,
      pages: book.pages.toString(),
      language: book.language,
      format: book.format,
    })
    setShowAddForm(true)
  }

  const handleDelete = (bookId) => {
    if (window.confirm("Kitobni o'chirishni tasdiqlaysizmi?")) {
      deleteBook(bookId)
    }
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">👨‍💼 Admin Panel</h1>
        <p className="text-lg opacity-90">Kutubxona boshqaruv paneli</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Jami kitoblar</p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.totalBooks}</p>
            </div>
            <div className="text-3xl">📚</div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Foydalanuvchilar</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {stats.totalUsers.toLocaleString()}
              </p>
            </div>
            <div className="text-3xl">👥</div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Yuklab olingan</p>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {stats.totalDownloads.toLocaleString()}
              </p>
            </div>
            <div className="text-3xl">⬇️</div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">O'rtacha baho</p>
              <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{stats.avgRating.toFixed(1)}</p>
            </div>
            <div className="text-3xl">⭐</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="border-b dark:border-gray-700">
          <nav className="flex space-x-8 px-8">
            {[
              { id: "dashboard", label: "Dashboard", icon: "📊" },
              { id: "books", label: "Kitoblar", icon: "📚" },
              { id: "users", label: "Foydalanuvchilar", icon: "👥" },
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
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">Tizim statistikasi</h3>

              {/* Charts placeholder */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-4">Eng ko'p o'qilgan kitoblar</h4>
                  <div className="space-y-3">
                    {books.slice(0, 5).map((book, index) => (
                      <div key={book.id} className="flex items-center justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          {index + 1}. {book.title}
                        </span>
                        <span className="font-medium text-gray-800 dark:text-white">{book.downloadCount}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-4">Kategoriyalar bo'yicha</h4>
                  <div className="space-y-3">
                    {Object.entries(
                      books.reduce((acc, book) => {
                        acc[book.category] = (acc[book.category] || 0) + 1
                        return acc
                      }, {}),
                    ).map(([category, count]) => (
                      <div key={category} className="flex items-center justify-between">
                        <span className="text-gray-600 dark:text-gray-400">{category}</span>
                        <span className="font-medium text-gray-800 dark:text-white">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "books" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">Kitoblar boshqaruvi</h3>
                <button
                  onClick={() => {
                    setShowAddForm(true)
                    setEditingBook(null)
                    setFormData({
                      title: "",
                      author: "",
                      category: "",
                      year: new Date().getFullYear(),
                      description: "",
                      pages: "",
                      language: "O'zbek",
                      format: ["PDF"],
                    })
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  ➕ Yangi kitob qo'shish
                </button>
              </div>

              {/* Add/Edit Form */}
              {showAddForm && (
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl animate-scale-in">
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                    {editingBook ? "Kitobni tahrirlash" : "Yangi kitob qo'shish"}
                  </h4>
                  <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Kitob nomi
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Muallif</label>
                      <input
                        type="text"
                        name="author"
                        value={formData.author}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Kategoriya
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      >
                        <option value="">Kategoriyani tanlang</option>
                        <option value="Adabiyot">Adabiyot</option>
                        <option value="Texnologiya">Texnologiya</option>
                        <option value="Tarix">Tarix</option>
                        <option value="Fan">Fan</option>
                        <option value="Biznes">Biznes</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Nashr yili
                      </label>
                      <input
                        type="number"
                        name="year"
                        value={formData.year}
                        onChange={handleInputChange}
                        min="1900"
                        max={new Date().getFullYear()}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Sahifalar soni
                      </label>
                      <input
                        type="number"
                        name="pages"
                        value={formData.pages}
                        onChange={handleInputChange}
                        min="1"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Til</label>
                      <select
                        name="language"
                        value={formData.language}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="O'zbek">O'zbek</option>
                        <option value="Ingliz">Ingliz</option>
                        <option value="Rus">Rus</option>
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tavsif</label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Formatlar
                      </label>
                      <div className="flex space-x-4">
                        {["PDF", "EPUB", "MOBI"].map((format) => (
                          <label key={format} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={formData.format.includes(format)}
                              onChange={() => handleFormatChange(format)}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-gray-700 dark:text-gray-300">{format}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="md:col-span-2 flex space-x-4">
                      <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                      >
                        {editingBook ? "Yangilash" : "Qo'shish"}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowAddForm(false)
                          setEditingBook(null)
                        }}
                        className="bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-300 px-6 py-2 rounded-lg font-medium transition-colors"
                      >
                        Bekor qilish
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Books Table */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b dark:border-gray-600">
                      <th className="text-left py-3 px-4 font-semibold text-gray-800 dark:text-white">Kitob</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-800 dark:text-white">Muallif</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-800 dark:text-white">Kategoriya</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-800 dark:text-white">Baho</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-800 dark:text-white">
                        Yuklab olingan
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-800 dark:text-white">Amallar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {books.map((book) => (
                      <tr
                        key={book.id}
                        className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-3">
                            <img
                              src={book.cover || "/placeholder.svg"}
                              alt={book.title}
                              className="w-12 h-16 object-cover rounded"
                            />
                            <div>
                              <div className="font-medium text-gray-800 dark:text-white">{book.title}</div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">{book.year}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{book.author}</td>
                        <td className="py-3 px-4">
                          <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full text-xs">
                            {book.category}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-1">
                            <span className="text-yellow-400">⭐</span>
                            <span className="text-gray-600 dark:text-gray-400">{book.rating}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                          {book.downloadCount.toLocaleString()}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEdit(book)}
                              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                            >
                              ✏️
                            </button>
                            <button
                              onClick={() => handleDelete(book.id)}
                              className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
                            >
                              🗑️
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "users" && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">Foydalanuvchilar</h3>
              <div className="text-center py-12">
                <div className="text-6xl mb-4">👥</div>
                <h4 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
                  Foydalanuvchilar boshqaruvi
                </h4>
                <p className="text-gray-500 dark:text-gray-500">Bu funksiya keyingi versiyada qo'shiladi</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminPanel
