import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import vehicleData from './electric_vehicles_data.json';

const BarChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    // Prepare data
    const makes = vehicleData.reduce((acc, vehicle) => {
      acc[vehicle.Make] = (acc[vehicle.Make] || 0) + 1;
      return acc;
    }, {});

    const data = Object.keys(makes).map(make => ({
      make,
      count: makes[make],
    }));

    // Set dimensions
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Clear any previous chart
    d3.select(chartRef.current).select('svg').remove();

    // Create SVG container
    const svg = d3.select(chartRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Set up scales
    const x = d3.scaleBand()
      .domain(data.map(d => d.make))
      .range([0, width])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.count)])
      .nice()
      .range([height, 0]);

    // Append x-axis
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .style('text-anchor', 'end');

    // Append y-axis
    svg.append('g')
      .call(d3.axisLeft(y));

    // Create bars
    svg.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.make))
      .attr('y', d => y(d.count))
      .attr('width', x.bandwidth())
      .attr('height', d => height - y(d.count))
      .attr('fill', 'steelblue');

    // Add labels
    svg.selectAll('.label')
      .data(data)
      .enter()
      .append('text')
      .attr('class', 'label')
      .attr('x', d => x(d.make) + x.bandwidth() / 2)
      .attr('y', d => y(d.count) - 5)
      .attr('text-anchor', 'middle')
      .text(d => d.count);
  }, []);

  return <div ref={chartRef}></div>;
};

export default BarChart;
