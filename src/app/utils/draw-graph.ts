import { select } from 'd3-selection';
import * as d3 from 'd3';

export function drawChart(intakeAmount?) {
  const existingChart = select('#chart-container svg');
  if (!existingChart.empty()) {
    existingChart.remove();
  }
  console.log('intakeAmount', intakeAmount);
  const data = [
    { nutrient: 'Protein', goal: 200, intake: intakeAmount.protein },
    { nutrient: 'Fat', goal: 70, intake: intakeAmount.fat },
    { nutrient: 'Carb', goal: 150, intake: intakeAmount.carbohydrates },
    // Add more data for other nutrients as needed
  ];

  // Define chart dimensions and margins
  const margin = { top: 40, right: 40, bottom: 40, left: 40 };
  const width = window.innerWidth - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  // Create SVG element
  const svg = d3
    .select('#chart-container')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  // Define scales
  const xScale = d3
    .scaleBand()
    .domain(data.map(d => d.nutrient))
    .range([0, width])
    .padding(0.2);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, d => Math.max(d.goal, d.intake))])
    .range([height, 0]);

  // Define colors for the stacked bars
  const colors = d3.scaleOrdinal().domain(['goal', 'intake']).range(['#1f77b4', '#ff7f0e']);

  // Create stacked bars
  svg
    .selectAll('.bar')
    .data(data)
    .enter()
    .append('g')
    .attr('class', 'bar')
    .attr('transform', d => `translate(${xScale(d.nutrient)},0)`)
    .selectAll('rect')
    .data(d => [
      { key: 'goal', value: d.goal },
      { key: 'intake', value: d.intake },
    ])
    .enter()
    .append('rect')
    .attr('x', 0)
    .attr('y', d => yScale(d.value))
    .attr('width', xScale.bandwidth())
    .attr('height', d => height - yScale(d.value))
    .attr('fill', d => colors(d.key));

  // Add x-axis
  svg.append('g').attr('transform', `translate(0,${height})`).call(d3.axisBottom(xScale));

  // Add y-axis
  svg.append('g').call(d3.axisLeft(yScale));

  // Add axis labels
  svg
    .append('text')
    .attr('text-anchor', 'end')
    .attr('x', width)
    .attr('y', height + margin.top + 20)
    .text('Nutrients');

  svg
    .append('text')
    .attr('text-anchor', 'end')
    .attr('x', 0)
    .attr('y', -margin.left + 10)
    .attr('transform', 'rotate(-90)')
    .text('Amount(g)')
    .attr('font-size', 11);

  svg
    .append('text')
    .attr('x', width / 2) // Adjust the x-coordinate as needed
    .attr('y', -margin.top / 2) // Adjust the y-coordinate as needed
    .attr('text-anchor', 'middle') // Center the text horizontally
    .text('Daily Macro Intake')
    .attr('fill', '#333') // Adjust the fill color as needed
    .attr('font-size', 18)
    .attr('line-height', 18)
    .attr('font-weight', 700);

  // Make the chart responsive to window size changes
  window.addEventListener('resize', () => {
    const newWidth = window.innerWidth - margin.left - margin.right;
    svg.attr('width', newWidth + margin.left + margin.right);
    xScale.range([0, newWidth]);
    svg.selectAll('rect').attr('width', xScale.bandwidth());
    svg.select('.x-axis').call(d3.axisBottom(xScale));
  });
}
