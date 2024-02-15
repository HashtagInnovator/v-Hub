/* eslint-disable react-hooks/exhaustive-deps */
// PieChart.js
import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const PieChart = ({ data }) => {
  const chartRef = useRef();

  useEffect(() => {
    drawChart();
  }, [data]);
  

  const drawChart = () => {
    const width = 500;
    const height = 300;
    const radius = Math.min(width, height) / 2;
  
    // Remove any existing SVG before drawing
    d3.select(chartRef.current).selectAll('*').remove();
  
    const svg = d3
      .select(chartRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);
  
      const color = d3.scaleOrdinal().range(['#5bc0de', 'purple', 'pink']); // Add a color for Likelihood

      const pie = d3.pie().value((d) => d);
      const path = d3.arc().outerRadius(radius).innerRadius(0);
  
      const arcs = svg
        .selectAll('path')
        .data(pie(data))
        .enter()
        .append('g')
        .attr('class', 'arc');
  
      arcs
        .append('path')
        .attr('d', path)
        .attr('fill', (d, i) => color(i))
        .attr('stroke', '#fff')
        .style('stroke-width', '2px');
  
      // Add percentage labels
      arcs
        .append('text')
        .attr('transform', (d) => `translate(${path.centroid(d)})`)
        .attr('dy', '.35em')
        .style('text-anchor', 'middle')
        .text((d, i) => {
          const label = `${(((d.endAngle - d.startAngle) / (2 * Math.PI)) * 100).toFixed(2)}%`;
          const category = i === 0 ? 'Intensity' : i === 1 ? 'Relevance' : 'Likelihood';
          return `${label} - ${category}`;
        });
        };
  return <div ref={chartRef}></div>;
};

export default PieChart;
