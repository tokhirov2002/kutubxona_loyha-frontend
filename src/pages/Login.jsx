"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const Login = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const { login, user } = useAuth()
  const navigate = useNavigate()

  // Agar foydalanuvchi allaqachon tizimga kirgan bo'lsa
  if (user) {
    navigate("/")
    return null
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Xatolikni tozalash
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.email) {
      newErrors.email = "Email manzil kiritilishi shart"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email manzil noto'g'ri formatda"
    }

    if (!formData.password) {
      newErrors.password = "Parol kiritilishi shart"
    } else if (formData.password.length < 6) {
      newErrors.password = "Parol kamida 6 ta belgidan iborat bo'lishi kerak"
    }

    if (!isLogin) {
      if (!formData.name) {
        newErrors.name = "Ism kiritilishi shart"
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Parolni tasdiqlash shart"
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Parollar mos kelmaydi"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)

    // Mock API call
    setTimeout(() => {
      const userData = {
        id: Date.now(),
        name: formData.name || formData.email.split("@")[0],
        email: formData.email,
        role: formData.email === "admin@kutubxona.uz" ? "admin" : "user",
      }

      login(userData)
      setLoading(false)
      navigate("/")
    }, 1500)
  }

  const handleGoogleLogin = () => {
    setLoading(true)
    // Mock Google login
    setTimeout(() => {
      const userData = {
        id: Date.now(),
        name: "Google User",
        email: "user@gmail.com",
        role: "user",
      }
      login(userData)
      setLoading(false)
      navigate("/")
    }, 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-md w-full space-y-8 animate-fade-in">
        {/* Header */}
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">📚</div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            {isLogin ? "Tizimga kirish" : "Ro'yxatdan o'tish"}
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            {isLogin ? "Hisobingizga kiring" : "Yangi hisob yarating"}
          </p>
        </div>

        {/* Form */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  To'liq ism
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${
                    errors.name ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                  }`}
                  placeholder="Ismingizni kiriting"
                />
                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email manzil
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${
                  errors.email ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                }`}
                placeholder="email@example.com"
              />
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Parol
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${
                  errors.password ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                }`}
                placeholder="Parolingizni kiriting"
              />
              {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
            </div>

            {!isLogin && (
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Parolni tasdiqlang
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${
                    errors.confirmPassword ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                  }`}
                  placeholder="Parolni qayta kiriting"
                />
                {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin text-xl">⏳</div>
                  <span>Kuting...</span>
                </>
              ) : (
                <span>{isLogin ? "Kirish" : "Ro'yxatdan o'tish"}</span>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">yoki</span>
            </div>
          </div>

          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 flex items-center justify-center space-x-2"
          >
            <span className="text-xl">🔍</span>
            <span>Google orqali kirish</span>
          </button>

          {/* Switch Mode */}
          <div className="text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin)
                setFormData({ name: "", email: "", password: "", confirmPassword: "" })
                setErrors({})
              }}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
            >
              {isLogin ? "Hisobingiz yo'qmi? Ro'yxatdan o'ting" : "Hisobingiz bormi? Tizimga kiring"}
            </button>
          </div>

          {/* Demo Accounts */}
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Demo hisoblar:</h4>
            <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
              <div>👤 Oddiy foydalanuvchi: user@kutubxona.uz</div>
              <div>👨‍💼 Admin: admin@kutubxona.uz</div>
              <div>🔑 Parol: 123456</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
