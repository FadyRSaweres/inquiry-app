import { useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";

// Mock types for demonstration
type Product = {
  id: string;
  name: string;
  price: string;
  salePrice: string;
};

export default function Inquiry() {
  const navigate = useNavigate();
  // Mock data for demonstration
  const [products] = useLocalStorage<Product[]>("products", []);
  const [search, setSearch] = useState("");

  const filtered = products.filter((p) =>
    p?.name?.toLowerCase().includes(search.toLowerCase())
  );

  const handleReturn = () => {
    navigate("/");
    // This would navigate back to main page
    // You can replace this with your navigation logic
  };

  return (
    <div className="bg-gray-100 min-h-screen" dir="rtl">
      {/* Fixed Header with Return Button */}
      <div className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <div className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <button
              onClick={handleReturn}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
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
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              رجوع
            </button>
            <h1 className="text-xl font-bold text-gray-800">الاستعلامات</h1>
          </div>

          {/* Search Bar */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="ابحث عن منتج..."
                className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <svg
                className="absolute right-3 top-3.5 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <button
              onClick={() => setSearch("")}
              className="bg-blue-500 text-white px-6 rounded-lg hover:bg-blue-600 transition-all font-bold"
            >
              مسح
            </button>
          </div>

          {/* Results Counter */}
          {products.length > 0 && (
            <p className="text-sm text-gray-600 mt-2">
              {filtered.length} من {products.length} منتج
            </p>
          )}
        </div>
      </div>

      {/* Main Content - Virtualized List */}
      <div className="pt-44 px-4 pb-4">
        <div className="h-[calc(100vh-200px)] overflow-y-auto">
          <div className="space-y-3">
            {filtered.length === 0 && products.length > 0 && (
              <div className="text-center py-8 text-gray-500">
                <svg
                  className="w-16 h-16 mx-auto mb-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-lg font-semibold">لا توجد نتائج للبحث</p>
                <p className="text-sm mt-1">جرب البحث بكلمات مختلفة</p>
              </div>
            )}

            {filtered.length === 0 && products.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <svg
                  className="w-16 h-16 mx-auto mb-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
                <p className="text-lg font-semibold">لا توجد منتجات</p>
                <p className="text-sm mt-1">قم بإضافة منتجات أولاً</p>
              </div>
            )}

            {filtered.map((p) => (
              <div
                key={p.id}
                className="bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h2 className="text-lg font-bold text-gray-800 mb-3">
                      {p.name}
                    </h2>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm text-gray-600">
                          سعر الشراء:
                        </span>
                        <span className="text-blue-600 font-bold">
                          {p.price} ج.م
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-gray-600">
                          سعر البيع:
                        </span>
                        <span className="text-green-600 font-bold">
                          {p.salePrice} ج.م
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span className="text-sm text-gray-600">الربح:</span>
                        <span className="text-purple-600 font-bold">
                          {Number(p.salePrice) - Number(p.price)} ج.م
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-full p-3">
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
