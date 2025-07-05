const LoadingSpinner = () => {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin text-6xl mb-4">📚</div>
          <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">Yuklanmoqda...</h2>
          <p className="text-gray-500 dark:text-gray-500">Kitoblar ma'lumotlari olinmoqda</p>
        </div>
      </div>
    )
  }
  
  export default LoadingSpinner
  