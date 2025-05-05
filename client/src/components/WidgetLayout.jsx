import GridLayout from "react-grid-layout";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#00bcd4", "#ffb6b9"];

const PieDistribution = ({ data }) => {
  const chartData = data.map((asset) => ({
    name: asset.name,
    value: asset.market_cap,
  }));

  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          outerRadius={80}
          label
        >
          {chartData.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

const LinePerformance = ({ data }) => {
  const chartData = data[0]?.sparkline_in_7d?.price.map((_, i) => {
    const point = { name: `T${i}` };
    data.forEach((asset) => {
      point[asset.symbol.toUpperCase()] = asset.sparkline_in_7d.price[i];
    });
    return point;
  });

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        {data.map((asset, i) => (
          <Line
            key={i}
            type="monotone"
            dataKey={asset.symbol.toUpperCase()}
            stroke={COLORS[i % COLORS.length]}
            dot={false}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

const WidgetLayout = ({ data }) => {
  const layout = [
    { i: "pie", x: 0, y: 0, w: 4, h: 3 },
    { i: "line", x: 4, y: 0, w: 8, h: 3 },
  ];

  return (
    <div className="overflow-x-auto w-full">
      <div className="min-w-[1200px]">
        <GridLayout
          className="layout"
          layout={layout}
          cols={12}
          rowHeight={100}
          width={1200}
        >
          <div
            key="pie"
            className="bg-white p-4 rounded shadow overflow-hidden"
          >
            <PieDistribution data={data} />
          </div>
          <div
            key="line"
            className="bg-white p-4 rounded shadow overflow-hidden"
          >
            <LinePerformance data={data} />
          </div>
        </GridLayout>
      </div>
    </div>
  );
};

export default WidgetLayout;
