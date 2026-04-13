import React from "react";
import { Chart } from "react-google-charts";
import { useGetUsersQuery } from "../../../redux/services/userApiServices/userApiServices";

const UserChart = () => {
  const { data: allUser, isLoading } = useGetUsersQuery();

  if (isLoading) return <p>Loading...</p>;

  // Get users array safely
  const users = allUser?.data || [];

  // Count users by level
  const levelCount = {};

  users.forEach((user) => {
    const level = user.level || "Unknown";
    levelCount[level] = (levelCount[level] || 0) + 1;
  });

  // Convert to chart format
  const chartData = [["Level", "Users"]];

  Object.keys(levelCount).forEach((level) => {
    chartData.push([level, levelCount[level]]);
  });

  return (
    <>
      <div style={{ width: "100%", height: "400px" }}>
        <Chart
          chartType="PieChart"
          data={chartData}
          options={{ title: "User Levels Distribution" }}
          width={"100%"}
          height={"100%"}
        />
      </div>
    </>
  );
};

export default UserChart;
