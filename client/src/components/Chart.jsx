import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

export const PieDistribution = ({ data }) => {
  const chartData = data.map(asset => ({ name: asset.name, value: asset.value }));
  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie data={chartData} dataKey="value" nameKey="name" outerRadius={80} label>
          {chartData.map((_, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export const LinePerformance = ({ data }) => {
  const chartData = data[0].history.map((_, i) => ({
    name: `Day ${i+1}`,
    ...data.reduce((acc, asset) => {
      acc[asset.name] = asset.history[i];
      return acc;
    }, {})
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        {data.map((asset, i) => (
          <Line type="monotone" dataKey={asset.name} stroke={COLORS[i % COLORS.length]} key={i} />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};
