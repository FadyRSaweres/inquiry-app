import { useState, useEffect } from "react";
import initialData from "../assets/initialData.json";
import { useNavigate } from "react-router-dom";
// Mock initial data for demonstration

type Product = {
  id: string;
  name: string;
  price: string;
  salePrice: string;
};

const STORAGE_KEY = "products";

export default function Crud() {
  const navigate = useNavigate()
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<Product>({
    id: "",
    name: "",
    price: "",
    salePrice: "",
  });
  const [editing, setEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Load from localStorage on mount
  useEffect(() => {
    loadFromStorage();
  }, []);

  const loadFromStorage = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: Product[] = JSON.parse(stored);
        setProducts(parsed);
      } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
        setProducts([]);
      }
    } catch (error) {
      console.error("Error loading from localStorage:", error);
      setProducts([]);
    }
  };

  const saveToStorage = (data: Product[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setProducts(data);
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  };

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const handleSave = () => {
    let updatedProducts: Product[];

    if (editing) {
      updatedProducts = products.map((p) => (p.id === form.id ? form : p));
      setEditing(false);
    } else {
      updatedProducts = [...products, { ...form, id: generateId() }];
    }

    saveToStorage(updatedProducts);
    setForm({ id: "", name: "", price: "", salePrice: "" });
  };

  const handleEdit = (p: Product) => {
    setForm(p);
    setEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id: string) => {
    const updatedProducts = products.filter((p) => p.id !== id);
    saveToStorage(updatedProducts);
  };

  const handleLoadInitial = () => {
    const dataWithIds = initialData.map((item) => ({
      ...item,
      id: generateId(),
    }));
    saveToStorage(dataWithIds as Product[]);
  };

  const handleReturn = () => {
    // Navigation logic would go here
    navigate('/inquiry-app')
  };

  // Filter products based on search term
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen pb-6" dir="rtl">
      {/* Fixed Header with Return Button */}
      <div className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <div className="p-4 flex items-center gap-3">
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
          <h1 className="text-xl font-bold text-gray-800">إدارة المنتجات</h1>
        </div>
      </div>

      {/* Main Content - Add padding for fixed header */}
      <div className="pt-20 px-4">
        {/* Load Initial Data Button */}
        <button
          onClick={handleLoadInitial}
          disabled={products.length > 0}
          className={`w-full p-3 mb-4 text-white rounded-lg transition-all ${
            products.length > 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          تحميل البيانات الافتراضية
        </button>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6 space-y-3">
          <h2 className="text-lg font-bold text-gray-800 mb-3">
            {editing ? "تعديل المنتج" : "إضافة منتج جديد"}
          </h2>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="اسم المنتج"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            placeholder="سعر الشراء"
            type="number"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            value={form.salePrice}
            onChange={(e) => setForm({ ...form, salePrice: e.target.value })}
            placeholder="سعر البيع"
            type="number"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSave}
            className={`w-full p-3 text-white rounded-lg font-bold transition-all ${
              editing
                ? "bg-yellow-500 hover:bg-yellow-600"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {editing ? "تعديل المنتج" : "إضافة المنتج"}
          </button>
          {editing && (
            <button
              onClick={() => {
                setForm({ id: "", name: "", price: "", salePrice: "" });
                setEditing(false);
              }}
              className="w-full p-3 bg-gray-500 text-white rounded-lg font-bold hover:bg-gray-600 transition-all"
            >
              إلغاء
            </button>
          )}
        </div>

        {/* Search Input */}
        {products.length > 0 && (
          <div className="mb-4">
            <div className="relative">
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
            <p className="text-sm text-gray-600 mt-2">
              {filteredProducts.length} من {products.length} منتج
            </p>
          </div>
        )}

        {/* Products List - Virtualized */}
        <div className="h-[calc(100vh-450px)] overflow-y-auto">
          <div className="space-y-3 pb-4">
            {filteredProducts.length === 0 && products.length > 0 && (
              <div className="text-center py-8 text-gray-500">
                لا توجد نتائج للبحث
              </div>
            )}
            {filteredProducts.length === 0 && products.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                لا توجد منتجات. أضف منتجاً جديداً أو حمل البيانات الافتراضية
              </div>
            )}
            {filteredProducts.map((p) => (
              <div
                key={p.id}
                className="bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition-all"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h2 className="font-bold text-lg text-gray-800">
                      {p.name}
                    </h2>
                    <div className="mt-2 space-y-1">
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">سعر الشراء:</span>{" "}
                        <span className="text-blue-600 font-bold">
                          {p.price} ج.م
                        </span>
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">سعر البيع:</span>{" "}
                        <span className="text-green-600 font-bold">
                          {p.salePrice} ج.م
                        </span>
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">الربح:</span>{" "}
                        <span className="text-purple-600 font-bold">
                          {Number(p.salePrice) - Number(p.price)} ج.م
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(p)}
                    className="flex-1 px-4 py-2 bg-yellow-500 text-white rounded-lg font-bold hover:bg-yellow-600 transition-all flex items-center justify-center gap-2"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    تعديل
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg font-bold hover:bg-red-600 transition-all flex items-center justify-center gap-2"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    حذف
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
