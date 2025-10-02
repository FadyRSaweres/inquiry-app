import { useNavigate } from "react-router-dom";
import checkCookie from "../../utils/checkCookie";

export default function NoAccessPage() {
  const handleGoBack = () => {
    window.history.back();
  };

  const navigate = useNavigate();

  const handleGoHome = () => {
    if (checkCookie()) {
      navigate("/inquiry-app/home");
    } else {
      navigate("/inquiry-app");
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4"
      dir="rtl"
    >
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        {/* Icon */}
        <div className="mb-6 flex justify-center">
          <div className="bg-red-100 rounded-full p-6">
            <svg
              className="w-16 h-16 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          ليس لديك صلاحية
        </h1>

        {/* Description */}
        <p className="text-gray-600 mb-2">
          عذراً، ليس لديك الصلاحية للوصول إلى هذه الصفحة
        </p>
        <p className="text-gray-500 text-sm mb-8">
          يرجى تسجيل الدخول أو التواصل مع المسؤول للحصول على الصلاحيات المطلوبة
        </p>

        {/* Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleGoHome}
            className="w-full bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            العودة للصفحة الرئيسية
          </button>

          <button
            onClick={handleGoBack}
            className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
            العودة للخلف
          </button>
        </div>

        {/* Additional Info */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            رمز الخطأ:{" "}
            <span className="font-mono font-semibold text-gray-700">403</span>
          </p>
        </div>
      </div>
    </div>
  );
}
