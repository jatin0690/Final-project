import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import './index.css';
import App from './App';
import { AuthProvider } from './contexts/AuthContext'; // ✅ Import the provider
import { AssetProvider } from "./contexts/AssetContext";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider> {/* ✅ Wrap your App here */}
      <AssetProvider>
        <App />
      </AssetProvider>
    </AuthProvider>
  </React.StrictMode>
);
//updated