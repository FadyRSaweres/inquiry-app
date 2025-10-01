import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MobileApp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const handleLogin = () => {
    // Simple validation
    if (!username || !password) {
      setError("يرجى إدخال اسم المستخدم وكلمة المرور");
      return;
    }

    if (username === "remon" && password === "987654321") {
      console.log("SSSSS");
      setError("");

      // Set cookie with token that expires after 1 day
      const expires = new Date();
      expires.setDate(expires.getDate() + 1);

      document.cookie = `token=remon; expires=${expires.toUTCString()}; path=/; SameSite=Strict`;
      navigate("home");
      window.location.reload();
      // Optional: Redirect or update UI state here
      // navigate('/dashboard'); // if using react-router
    } else {
      setError("خطأ في كلمة المرور او اسم المستخدم");
      return;
    }
  };

  // Login Page
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 flex items-center justify-center p-4"
      dir="rtl"
    >
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center">
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
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="أدخل كلمة المرور"
            />
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-blue-500 to-green-600 hover:from-blue-600 hover:to-green-700 text-white font-bold py-4 rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105 active:scale-95"
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
