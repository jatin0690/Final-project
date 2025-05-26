import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const AssetContext = createContext();

export const AssetProvider = ({ children }) => {
  const { userData } = useAuth();
  const [myAssets, setMyAssets] = useState([]);

  // Load assets for the current user
  useEffect(() => {
    if (userData?.email) {
      const allAssets = JSON.parse(localStorage.getItem("userAssets")) || {};
      setMyAssets(allAssets[userData.email] || []);
    }
  }, [userData]);

  // Save assets whenever myAssets changes
  useEffect(() => {
    if (userData?.email) {
      const allAssets = JSON.parse(localStorage.getItem("userAssets")) || {};
      allAssets[userData.email] = myAssets;
      localStorage.setItem("userAssets", JSON.stringify(allAssets));
    }
  }, [myAssets, userData]);

  const addAsset = (asset) => {
    setMyAssets((prev) =>
      prev.find((item) => item.id === asset.id) ? prev : [...prev, asset]
    );
  };

  const removeAsset = (assetId) => {
    setMyAssets((prev) => prev.filter((asset) => asset.id !== assetId));
  };

  return (
    <AssetContext.Provider value={{ myAssets, addAsset, removeAsset }}>
      {children}
    </AssetContext.Provider>
  );
};

export const useAsset = () => useContext(AssetContext);
