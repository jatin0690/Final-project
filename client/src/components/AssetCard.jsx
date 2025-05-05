const AssetCard = ({ asset }) => {
  const isPositive = asset.price_change_percentage_24h > 0;

  return (
    <div className="p-4 w-full max-w-xs rounded-lg cursor-pointer bg-gradient-to-br from-white via-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 dark:via-gray-950 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg hover:scale-105 transition duration-300">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <img
            src={asset.image}
            alt={asset.name}
            className="w-8 h-8 rounded-full border"
          />
          <div>
            <h2 className="text-base font-semibold text-gray-800 dark:text-white">{asset.name}</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">{asset.symbol}</p>
          </div>
        </div>
        <span
          className={`text-xs font-medium px-2 py-1 rounded-full ${
            isPositive
              ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
              : "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300"
          }`}
        >
          {isPositive ? "▲" : "▼"} {asset.price_change_percentage_24h?.toFixed(2)}%
        </span>
      </div>

      <div>
        <p className="text-xs text-gray-500 dark:text-gray-400">Current Price</p>
        <p className="text-lg font-bold text-gray-800 dark:text-white">${asset.current_price.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default AssetCard;
