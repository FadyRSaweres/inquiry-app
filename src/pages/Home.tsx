import { useNavigate } from "react-router-dom";

export default function MobileHomePage() {
  const navigate = useNavigate();

  const downloadProductsAsJson = () => {
    const productsData = localStorage.getItem("products");

    if (!productsData) {
      alert("لا توجد منتجات في localStorage");
      return;
    }

    const products = JSON.parse(productsData);
    const jsonString = JSON.stringify(products, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    const timestamp = new Date().toISOString().slice(0, 10);
    link.download = `products_${timestamp}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const uploadJsonFile = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json,.json";

    input.onchange = (event) => {
      const file = event?.target?.files?.[0];

      if (!file) {
        alert("لم يتم اختيار ملف");
        return;
      }

      if (!file.name.endsWith(".json")) {
        alert("يرجى اختيار ملف JSON فقط");
        return;
      }

      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const content = e.target?.result;
          const jsonData = JSON.parse(content);

          if (!Array.isArray(jsonData)) {
            alert("الملف يجب أن يحتوي على مصفوفة من المنتجات");
            return;
          }

          localStorage.setItem("products", JSON.stringify(jsonData));
          alert(`تم رفع ${jsonData.length} منتج بنجاح!`);
        } catch (error) {
          console.error("خطأ في قراءة الملف:", error);
          alert("خطأ: الملف غير صحيح أو تالف");
        }
      };

      reader.onerror = () => {
        alert("حدث خطأ أثناء قراءة الملف");
      };

      reader.readAsText(file);
    };

    input.click();
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4 gap-8"
      dir="rtl"
    >
      {/* Backup Buttons at Top */}
      <div className="flex gap-3 w-full max-w-md">
        <button
          onClick={uploadJsonFile}
          className="flex-1 text-sm flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-md hover:shadow-lg"
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
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L9 8m4-4v12"
            />
          </svg>
          رفع ملف
        </button>

        <button
          onClick={downloadProductsAsJson}
          className="flex-1 text-sm flex items-center justify-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold shadow-md hover:shadow-lg"
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
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          نسخة احتياطية
        </button>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">مرحباً بك</h1>
          <p className="text-gray-600">ريمون ثروت</p>
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
          <p className="text-gray-500 text-sm">
            © 2025 جميع الحقوق محفوظة لدى المطور
            <br />
            <span className="font-semibold">Fady Ragaa</span>
          </p>
        </div>
      </div>
    </div>
  );
}