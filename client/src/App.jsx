import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // <-- FIXED
import Dashboard from './components/Dashboard';
import Login from './Auth/Login';
import Register from "./Auth/Register";
import { useAuth } from './contexts/AuthContext';

function App() {
  // Set initial theme based on localStorage or default to light mode
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
  const { isAuthenticated } = useAuth();

  // Update the document body class to reflect the theme
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <div className="bg-gray-100 min-h-screen overflow-x-hidden dark:bg-gray-900 transition-colors duration-300">
      

      <Router>
        <Routes>
          <Route
            path="/"
            element={
              !isAuthenticated ? <Register /> : <Navigate to="/dashboard" />
            }
          />
          <Route
            path="/login"
            element={
              
              !isAuthenticated ? <Login /> : <Navigate to="/dashboard" />
            }
          />
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? <Dashboard /> : <Navigate to="/login" />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
