/* eslint-disable */
import React, { useState, useEffect } from 'react';
import vehicleData from './electric_vehicles_data.json';
import BarChart from './BarChart';
import PieChart from './PieChart';

import './App.css';
// import { Bar, Pie } from 'react-chartjs-2';
// import { Chart, registerables } from 'chart.js';

// Chart.register(...registerables);

// Sample Data (You can replace this with your JSON data)

function App() {
  // const [chartData, setChartData] = useState({});
  // const [pieData, setPieData] = useState({});
console.log("vehicleData",vehicleData)

// useEffect(() => {
//   if (!vehicleData || !Array.isArray(vehicleData)) {
//     console.error("vehicleData is not loaded properly or is not an array");
//     return;
//   }

//   // Process the data to get insights
//   const makes = vehicleData.reduce((acc, vehicle) => {
//     acc[vehicle.Make] = (acc[vehicle.Make] || 0) + 1;
//     return acc;
//   }, {});

//   const electricRanges = vehicleData.map((vehicle) => vehicle['Electric Range']);

//   // Set data for bar chart
//   setChartData({
//     labels: Object.keys(makes),
//     datasets: [
//       {
//         label: 'Number of Vehicles by Make',
//         data: Object.values(makes),
//         backgroundColor: ['rgba(75,192,192,1)', 'rgba(54,162,235,1)', 'rgba(255,206,86,1)', 'rgba(153,102,255,1)'],
//         borderColor: 'rgba(0,0,0,1)',
//         borderWidth: 2,
//       },
//     ],
//   });

//   // Set data for pie chart
//   const eligibleVehicles = vehicleData.filter(
//     (vehicle) =>
//       vehicle['Clean Alternative Fuel Vehicle (CAFV) Eligibility'] === 'Clean Alternative Fuel Vehicle Eligible'
//   ).length;
//   const nonEligibleVehicles = vehicleData.length - eligibleVehicles;

//   setPieData({
//     labels: ['Eligible', 'Not Eligible'],
//     datasets: [
//       {
//         label: 'CAFV Eligibility',
//         data: [eligibleVehicles, nonEligibleVehicles],
//         backgroundColor: ['rgba(75,192,192,1)', 'rgba(255,99,132,1)'],
//         hoverBackgroundColor: ['rgba(75,192,192,0.6)', 'rgba(255,99,132,0.6)'],
//       },
//     ],
//   });
// }, []);


  return (
    <div className="App">
      <header className="App-header">
        <h1>Electric Vehicles Dashboard</h1>
        <div className="chart-container">
          <BarChart />

        </div>
        <div className="chart-container">
          <PieChart />
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>VIN</th>
              <th>Make</th>
              <th>Model</th>
              <th>Electric Range</th>
              <th>CAFV Eligibility</th>
            </tr>
          </thead>
          <tbody>
            {console.log("vehicleData",vehicleData)}
            {vehicleData && vehicleData?.map((vehicle, index) => (
              <tr key={index}>
                <td>{vehicle['VIN (1-10)']}</td>
                <td>{vehicle.Make}</td>
                <td>{vehicle.Model}</td>
                <td>{vehicle['Electric Range']}</td>
                <td>{vehicle['Clean Alternative Fuel Vehicle (CAFV) Eligibility']}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </header>
    </div>
  );
}

export default App;
