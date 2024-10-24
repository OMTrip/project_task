import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import vehicleData from './electric_vehicles_data.json';

const PieChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    // Prepare data: Counting the number of vehicles by make
    const makes = vehicleData.reduce((acc, vehicle) => {
      acc[vehicle.Make] = (acc[vehicle.Make] || 0) + 1;
      return acc;
    }, {});

    const data = Object.keys(makes).map(make => ({
      make,
      count: makes[make],
    }));

    // Set dimensions
    const width = 500;
    const height = 500;
    const radius = Math.min(width, height) / 2;

    // Clear any previous chart
    d3.select(chartRef.current).select('svg').remove();

    // Create SVG container
    const svg = d3.select(chartRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    // Set color scale
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    // Generate pie chart data
    const pie = d3.pie()
      .value(d => d.count)
      .sort(null);

    const arc = d3.arc()
      .outerRadius(radius - 10)
      .innerRadius(0);

    const labelArc = d3.arc()
      .outerRadius(radius - 40)
      .innerRadius(radius - 40);

    // Create pie slices
    const g = svg.selectAll('.arc')
      .data(pie(data))
      .enter().append('g')
      .attr('class', 'arc');

    // Append pie slices
    g.append('path')
      .attr('d', arc)
      .attr('fill', d => color(d.data.make));

    // Append labels
    g.append('text')
      .attr('transform', d => `translate(${labelArc.centroid(d)})`)
      .attr('dy', '0.35em')
      .text(d => `${d.data.make}: ${d.data.count}`);

  }, []);

  return <div ref={chartRef}></div>;
};

export default PieChart;
