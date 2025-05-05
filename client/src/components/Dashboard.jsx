import { useEffect, useState } from "react";
import axios from "axios";
import AssetCard from "./AssetCard";
import Filters from "./Filters";
import WidgetLayout from "./WidgetLayout";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [assets, setAssets] = useState([]);
  const [filteredAssets, setFilteredAssets] = useState([]);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");

  const { logout, userData } = useAuth();
  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const res = await axios.get("https://api.coingecko.com/api/v3/coins/markets", {
          params: {
            vs_currency: "usd",
            order: "market_cap_desc",
            per_page: 10,
            page: 1,
            sparkline: true,
            price_change_percentage: "24h",
          },
        });
        setAssets(res.data);
        setFilteredAssets(res.data);
      } catch (err) {
        console.error("Error fetching data", err);
      }
    };

    fetchAssets();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="mt-[-70px] w-full min-h-screen bg-gradient-to-tr from-blue-50 via-white to-purple-100 dark:from-gray-900 dark:via-gray-950 dark:to-black transition-colors duration-300">
      
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
        <div className="text-2xl font-bold text-gray-800 dark:text-white">
          📈 CryptoDash
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
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-3 py-1.5 text-sm rounded-md text-white bg-gray-800 dark:bg-gray-200 dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-400 transition"
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>

        </div>
      </nav>

      {/* Page content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="mb-6 text-center">
          <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white drop-shadow-md">
            📊 Live Investment Portfolio
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
            Track top crypto assets in real-time with beautiful visualizations
          </p>
        </header>

        <section className="mb-6">
          <Filters assets={assets} setFiltered={setFilteredAssets} />
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">
          {filteredAssets.map((asset) => (
            <AssetCard key={asset.id} asset={asset} />
          ))}
        </section>

        <section className="mt-10">
          <WidgetLayout data={filteredAssets} />
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
