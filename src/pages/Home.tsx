import { useNavigate } from "react-router-dom";

export default function MobileHomePage() {
  const navigate = useNavigate();
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4"
      dir="rtl"
    >
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">مرحباً بك</h1>
          <p className="text-gray-600">اختر الخدمة المطلوبة</p>
        </div>

        {/* Buttons Container */}
        <div className="space-y-6">
          {/* Query Button */}
          <button
            onClick={() => navigate("inquiry")}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-6 px-8 rounded-full shadow-lg transform transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <span className="text-2xl">استعلامات</span>
          </button>

          {/* Add Button */}
          <button
            onClick={() => navigate("crud")}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-6 px-8 rounded-full shadow-lg transform transition-all duration-200 hover:scale-105 active:scale-95"
          >
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
