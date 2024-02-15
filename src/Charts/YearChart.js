import React, { useEffect } from 'react';
import * as d3 from 'd3';

const YearChart = ({ data }) => {
  useEffect(() => {
    if (data.length === 0) return;

    // Extract likelihood values and corresponding countries
    const likelihoodValues = data.map(entry => parseFloat(entry.likelihood) || 0);
    const countries = data.map(entry => entry.country || "Other");

    // Set up chart dimensions
    const width = 800;
    const height = 400;
    const margin = { top: 80, right: 100, bottom: 100, left: 40 };

    // Clear existing content
    const container = d3.select('#bar-chart-container');
    container.selectAll('*').remove();

    // Create an SVG element
    const svg = container
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Create scales for x and y axes
    const xScale = d3.scaleBand()
      .domain(countries)
      .range([0, width])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(likelihoodValues)])
      .range([height, 0]);

    // Create and append bars with animation
    svg.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', entry => xScale(entry.country || "Other"))
      .attr('y', height)
      .attr('width', xScale.bandwidth())
      .attr('height', 0)
      .transition()
      .duration(2000)
      .attr('y', entry => yScale(parseFloat(entry.likelihood) || 0))
      .attr('height', entry => height - yScale(parseFloat(entry.likelihood) || 0))
      .attr('fill', 'steelblue'); // Set bar color to steelblue

    // Create x-axis
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(xScale))
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .style('text-anchor', 'end');

    // Create y-axis
    svg.append('g')
      .call(d3.axisLeft(yScale));

    // Add legend
    const legend = svg.append('g')
      .attr('transform', `translate(${width - 100},${margin.top - 40})`);

    legend.append('rect')
      .attr('width', 18)
      .attr('height', 18)
      .attr('y', -margin.top-8)
      .attr('fill', 'steelblue');

    legend.append('text')
      .attr('x', 25)
      .attr('y',-margin.top)
      .attr('dy', '.35em')
      .style('text-anchor', 'start')
      .text('Likelihood');

    // Add chart title
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', -margin.top / 2)
      .attr('text-anchor', 'middle')
      .style('font-size', '26px')
      .text('Likelihood vs Country');

  }, [data]);

  return <div id="bar-chart-container"></div>;
};

export default YearChart;
