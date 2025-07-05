"use client"

import { useBooks } from "../context/BookContext"

const CategoryFilter = () => {
  const { categories, selectedCategory, setSelectedCategory } = useBooks()

  return (
    <div className="flex flex-wrap justify-center gap-3">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setSelectedCategory(category)}
          className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
            selectedCategory === category
              ? "bg-blue-600 text-white shadow-lg"
              : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  )
}

export default CategoryFilter
