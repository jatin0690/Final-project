import { useAsset } from "../contexts/AssetContext";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";

// Import react-toastify
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WidgetLayout from "./WidgetLayout";

const MyAssets = () => {
  const { myAssets, removeAsset } = useAsset();
  const { logout, userData } = useAuth();
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // New handler to remove asset and show toast
  const handleRemoveAsset = (id) => {
    removeAsset(id);
    toast.success("Successfully removed");
  };

  return (
    <div className="mt-[-70px] w-full min-h-screen bg-gradient-to-tr from-blue-50 via-white to-purple-100 dark:from-gray-900 dark:via-gray-950 dark:to-black transition-colors duration-300">

      {/* Toast container for toasts */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      {/* Navbar */}
      <header className="flex justify-end p-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-3 py-2 rounded-md text-white bg-gray-800 dark:bg-gray-300 hover:bg-gray-700 dark:hover:bg-gray-500 transition-all"
        >
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </header>

      <nav className="w-full bg-white dark:bg-gray-800 shadow-md py-4 px-6 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0">
        <div className="text-2xl cursor-pointer font-bold text-gray-800 dark:text-white">
          <Link to="/">
            📈 CryptoDash
          </Link>
        </div>

        <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-end">
          <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
            Welcome, {userData?.name || "User"} 👋
          </span>

          <button
            onClick={handleLogout}
            className="px-3 py-1.5 text-sm rounded-md bg-red-600 text-white hover:bg-red-500 transition"
          >
            🚪 Logout
          </button>
          <Link
            to="/"
            className="px-3 py-1.5 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-500 transition"
          >
            📊 Dashboard
          </Link>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-3 py-1.5 text-sm rounded-md text-white bg-gray-800 dark:bg-gray-200 dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-400 transition"
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>
      </nav>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="mb-6 text-center">
          <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white drop-shadow-md">
            💼 My Assets
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
            View and manage your favorite assets from the dashboard
          </p>
        </header>

        {myAssets.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            You haven't added any assets yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {myAssets.map((asset) => (
              <div
                key={asset.id}
                className="relative p-4 w-full max-w-xs rounded-lg bg-gradient-to-br from-white via-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 dark:via-gray-950 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg hover:scale-105 transition duration-300"
              >
                <button
                  onClick={() => handleRemoveAsset(asset.id)}
                  className="absolute top-[-10px] right-[-10px] text-sm text-white bg-red-500 hover:bg-red-700 dark:bg-red-400 dark:text-black px-2 py-1 rounded-full"
                  title="Remove from My Assets"
                >
                  ➖
                </button>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <img
                      src={asset.image}
                      alt={asset.name}
                      className="w-8 h-8 rounded-full border"
                    />
                    <div>
                      <h2 className="text-base font-semibold text-gray-800 dark:text-white">
                        {asset.name}
                      </h2>
                      <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">
                        {asset.symbol}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${
                      asset.price_change_percentage_24h > 0
                        ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                        : "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300"
                    }`}
                  >
                    {asset.price_change_percentage_24h > 0 ? "▲" : "▼"}{" "}
                    {asset.price_change_percentage_24h?.toFixed(2)}%
                  </span>
                </div>

                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Current Price</p>
                  <p className="text-lg font-bold text-gray-800 dark:text-white">
                    ${asset.current_price.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
        <section className="mt-10">
          <WidgetLayout data={myAssets} />
        </section>
      </div>
    </div>
  );
};

export default MyAssets;