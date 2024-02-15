import React, { useEffect } from 'react';
import * as d3 from 'd3';

const BarChart = ({ data }) => {
  useEffect(() => {
    if (data.length === 0) return;
    const width = 800;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 90, left: 40 };
    const legendWidth = 100; // Width of the legend

    // Clear existing content
    const container = d3.select(`#bar-chart-container-${data[0].sector}`);
    container.selectAll('*').remove();

    // Create an SVG element
    const svg = container
      .append('svg')
      .attr('width', width + margin.left + margin.right + legendWidth)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Extract intensity and relevance values from the data
    const intensityValues = data.map(entry => entry.intensity);
    const relevanceValues = data.map(entry => entry.relevance);
    const likelihoodValues = data.map(entry => entry.likelihood);

    // Create scales for x and y axes
    const xScale = d3.scaleBand()
      .domain(data.map(entry => entry.topic))
      .range([0, width])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      .domain([0, Math.max(...intensityValues, ...relevanceValues, ...likelihoodValues)])
      .range([height, 0]);

    // Create and append bars for intensity values
    svg.selectAll('.intensity-bar')
      .data(data)
      .enter().append('rect')
      .attr('class', 'intensity-bar')
      .attr('x', entry => xScale(entry.topic))
      .attr('y', height)
      .attr('width', xScale.bandwidth() / 3)
      .attr('height', 0)
      .transition()
      .duration(1000)
      .attr('y', entry => yScale(entry.intensity))
      .attr('height', entry => height - yScale(entry.intensity))
      .attr('fill', '#5bc0de');

    // Create and append bars for relevance values
    svg.selectAll('.relevance-bar')
      .data(data)
      .enter().append('rect')
      .attr('class', 'relevance-bar')
      .attr('x', entry => xScale(entry.topic) + xScale.bandwidth() / 3)
      .attr('y', height)
      .attr('width', xScale.bandwidth() / 3)
      .attr('height', 0)
      .transition()
      .duration(1000)
      .attr('y', entry => yScale(entry.relevance))
      .attr('height', entry => height - yScale(entry.relevance))
      .attr('fill', 'purple');

    // Create and append bars for likelihood values
    svg.selectAll('.likelihood-bar')
      .data(data)
      .enter().append('rect')
      .attr('class', 'likelihood-bar')
      .attr('x', entry => xScale(entry.topic) + (2 * xScale.bandwidth()) / 3)
      .attr('y', height)
      .attr('width', xScale.bandwidth() / 3)
      .attr('height', 0)
      .transition()
      .duration(1000)
      .attr('y', entry => yScale(entry.likelihood))
      .attr('height', entry => height - yScale(entry.likelihood))
      .attr('fill', 'pink');

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

    // Create legend
    const legend = svg.append('g')
      .attr('transform', `translate(${width + margin.right}, 0)`);

    // Intensity legend
    legend.append('rect')
      .attr('x', 0)
      .attr('y', 10)
      .attr('width', 18)
      .attr('height', 18)
      .attr('fill', '#5bc0de');

    legend.append('text')
      .attr('x', 25)
      .attr('y', 20)
      .text('Intensity');

    // Relevance legend
    legend.append('rect')
      .attr('x', 0)
      .attr('y', 40)
      .attr('width', 18)
      .attr('height', 18)
      .attr('fill', 'purple');

    legend.append('text')
      .attr('x', 25)
      .attr('y', 50)
      .text('Relevance');

    // Likelihood legend
    legend.append('rect')
      .attr('x', 0)
      .attr('y', 80)
      .attr('width', 18)
      .attr('height', 18)
      .attr('fill', 'pink');

    legend.append('text')
      .attr('x', 25)
      .attr('y', 95)
      .text('Likelihood');

  }, [data]);

  return <div id={`bar-chart-container-${data[0].sector}`}></div>;
};

export default BarChart;
