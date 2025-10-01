import { useState } from "react";

export default function MobileApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    // Simple validation
    if (!username || !password) {
      setError("يرجى إدخال اسم المستخدم وكلمة المرور");
      return;
    }

    // Here you would typically validate against your backend
    // For demo purposes, we'll just accept any non-empty credentials
    setError("");
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
    setError("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  // Login Page
  if (!isLoggedIn) {
    return (
      <div
        className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 flex items-center justify-center p-4"
        dir="rtl"
      >
        <div className="w-full max-w-md">
          {/* Logo/Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              تسجيل الدخول
            </h1>
            <p className="text-gray-600">أدخل بياناتك للمتابعة</p>
          </div>

          {/* Login Form */}
          <div className="bg-white rounded-3xl shadow-xl p-8">
            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Username Input */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                اسم المستخدم
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="أدخل اسم المستخدم"
              />
            </div>

            {/* Password Input */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                كلمة المرور
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="أدخل كلمة المرور"
              />
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105 active:scale-95"
            >
              دخول
            </button>

            {/* Forgot Password Link */}
            <div className="text-center mt-4">
              <button className="text-sm text-blue-600 hover:text-blue-800">
                نسيت كلمة المرور؟
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Home Page (after login)
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4"
      dir="rtl"
    >
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">مرحباً بك</h1>
          <p className="text-gray-600 mb-4">اختر الخدمة المطلوبة</p>
          <button
            onClick={handleLogout}
            className="text-sm text-red-600 hover:text-red-800 font-semibold"
          >
            تسجيل الخروج
          </button>
        </div>

        {/* Buttons Container */}
        <div className="space-y-6">
          {/* Query Button */}
          <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-6 px-8 rounded-full shadow-lg transform transition-all duration-200 hover:scale-105 active:scale-95">
            <span className="text-2xl">استعلامات</span>
          </button>

          {/* Add Button */}
          <button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-6 px-8 rounded-full shadow-lg transform transition-all duration-200 hover:scale-105 active:scale-95">
            <span className="text-2xl">إضافة</span>
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">© 2025 جميع الحقوق محفوظة</p>
        </div>
      </div>
    </div>
  );
}
