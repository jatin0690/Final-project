import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import './Index.css';
import App from './App';
import { AuthProvider } from './contexts/AuthContext'; // ✅ Import the provider

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider> {/* ✅ Wrap your App here */}
      <App />
    </AuthProvider>
  </React.StrictMode>
);
