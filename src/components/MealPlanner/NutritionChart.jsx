import React from 'react';
import {
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  Legend,
  Tooltip,
} from 'recharts';

const NutritionChart = ({ current, goals }) => {
  // Data with custom names
  const data = [
    {
      name: 'Carbs',
      value: Math.round((current.carbs / goals.carbs) * 100),
      details: `${current.carbs} / ${goals.carbs} g`,
      fill: '#22c55e', // Green
    },
    {
      name: 'Protein',
      value: Math.round((current.protein / goals.protein) * 100),
      details: `${current.protein} / ${goals.protein} g`,
      fill: '#3b82f6', // Blue
    },
    {
      name: 'Fat',
      value: Math.round((current.fat / goals.fat) * 100),
      details: `${current.fat} / ${goals.fat} g`,
      fill: '#f59e0b', // Yellow
    },
    {
      name: 'Calories',
      value: Math.round((current.calories / goals.calories) * 100),
      details: `${current.calories} / ${goals.calories} kcal`,
      fill: '#ef4444', // Red
    },
  ];

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="10%"
          outerRadius="80%"
          data={data}
          startAngle={180}
          endAngle={0}
        >
          <RadialBar
            minAngle={15}
            label={({ value }) => `${value}%`} // Display rounded percentage inside the chart
            background
            clockWise={true}
            dataKey="value"
          />
          {/* Tooltip for hover functionality */}
          <Tooltip
            formatter={(value, name, entry) => [
              entry.payload.details,
              entry.payload.name,
            ]} // Show "details" and "name"
            contentStyle={{ backgroundColor: '#f9fafb', borderRadius: '8px' }}
          />
          <Legend
            iconSize={10}
            width={120}
            height={140}
            layout="vertical"
            verticalAlign="middle"
            align="right"
          />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default NutritionChart;
