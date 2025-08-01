import { ChartType } from '../types/chart';

export interface TransformationTemplate {
  chartId: string;
  defaultData: string;
  transformationLogic: string;
}

export const transformationTemplates: TransformationTemplate[] = [
  {
    chartId: 'bar-chart',
    defaultData: `[
  { "letter": "A", "frequency": 0.08167 },
  { "letter": "B", "frequency": 0.01492 },
  { "letter": "C", "frequency": 0.02782 },
  { "letter": "D", "frequency": 0.04253 },
  { "letter": "E", "frequency": 0.12702 },
  { "letter": "F", "frequency": 0.02288 },
  { "letter": "G", "frequency": 0.02015 },
  { "letter": "H", "frequency": 0.06094 },
  { "letter": "I", "frequency": 0.06966 },
  { "letter": "J", "frequency": 0.00153 }
]`,
    transformationLogic: `function transformData(data) {
  // Bar Chart Transformation Logic
  const width = 928;
  const height = 500;
  const marginTop = 30;
  const marginRight = 0;
  const marginBottom = 30;
  const marginLeft = 40;

  // Declare the x (horizontal position) scale
  const x = d3.scaleBand()
    .domain(d3.groupSort(data, ([d]) => -d.frequency, (d) => d.letter))
    .range([marginLeft, width - marginRight])
    .padding(0.1);

  // Declare the y (vertical position) scale
  const y = d3.scaleLinear()
    .domain([0, d3.max(data, (d) => d.frequency)])
    .range([height - marginBottom, marginTop]);

  // Create the SVG container
  const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto;");

  // Add bars
  svg.append("g")
    .attr("fill", "steelblue")
    .selectAll()
    .data(data)
    .join("rect")
    .attr("x", (d) => x(d.letter))
    .attr("y", (d) => y(d.frequency))
    .attr("height", (d) => y(0) - y(d.frequency))
    .attr("width", x.bandwidth());

  // Add the x-axis
  svg.append("g")
    .attr("transform", \`translate(0,\${height - marginBottom})\`)
    .call(d3.axisBottom(x).tickSizeOuter(0));

  // Add the y-axis
  svg.append("g")
    .attr("transform", \`translate(\${marginLeft},0)\`)
    .call(d3.axisLeft(y).tickFormat((y) => (y * 100).toFixed()))
    .call(g => g.select(".domain").remove())
    .call(g => g.append("text")
      .attr("x", -marginLeft)
      .attr("y", 10)
      .attr("fill", "currentColor")
      .attr("text-anchor", "start")
      .text("↑ Frequency (%)"));

  return svg.node();
}`
  },
  {
    chartId: 'pie-chart',
    defaultData: `[
  { "name": "Apples", "value": 53 },
  { "name": "Oranges", "value": 25 },
  { "name": "Bananas", "value": 15 },
  { "name": "Grapes", "value": 7 }
]`,
    transformationLogic: `function transformData(data) {
  // Pie Chart Transformation Logic
  const width = 500;
  const height = 500;
  const radius = Math.min(width, height) / 2;

  // Create the color scale
  const color = d3.scaleOrdinal()
    .domain(data.map(d => d.name))
    .range(d3.schemeCategory10);

  // Create the pie layout
  const pie = d3.pie()
    .value(d => d.value)
    .sort(null);

  // Create the arc generator
  const arc = d3.arc()
    .innerRadius(0)
    .outerRadius(radius);

  // Create the SVG container
  const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [-width / 2, -height / 2, width, height])
    .attr("style", "max-width: 100%; height: auto;");

  // Add the arcs
  svg.append("g")
    .selectAll()
    .data(pie(data))
    .join("path")
    .attr("fill", d => color(d.data.name))
    .attr("d", arc)
    .append("title")
    .text(d => \`\${d.data.name}: \${d.data.value}\`);

  // Add labels
  svg.append("g")
    .attr("font-family", "sans-serif")
    .attr("font-size", 12)
    .attr("text-anchor", "middle")
    .selectAll()
    .data(pie(data))
    .join("text")
    .attr("transform", d => \`translate(\${arc.centroid(d)})\`)
    .call(text => text.append("tspan")
      .attr("y", "-0.4em")
      .attr("font-weight", "bold")
      .text(d => d.data.name))
    .call(text => text.filter(d => (d.endAngle - d.startAngle) > 0.25).append("tspan")
      .attr("x", 0)
      .attr("y", "0.7em")
      .attr("fill-opacity", 0.7)
      .text(d => d.data.value.toLocaleString("en-US")));

  return svg.node();
}`
  },
  {
    chartId: 'line-chart',
    defaultData: `[
  { "date": "2023-01-01", "value": 100 },
  { "date": "2023-02-01", "value": 120 },
  { "date": "2023-03-01", "value": 90 },
  { "date": "2023-04-01", "value": 150 },
  { "date": "2023-05-01", "value": 180 },
  { "date": "2023-06-01", "value": 160 },
  { "date": "2023-07-01", "value": 200 },
  { "date": "2023-08-01", "value": 220 },
  { "date": "2023-09-01", "value": 190 },
  { "date": "2023-10-01", "value": 250 }
]`,
    transformationLogic: `function transformData(data) {
  // Line Chart Transformation Logic
  const width = 928;
  const height = 500;
  const marginTop = 20;
  const marginRight = 30;
  const marginBottom = 30;
  const marginLeft = 40;

  // Parse dates
  const parseDate = d3.timeParse("%Y-%m-%d");
  const processedData = data.map(d => ({
    date: parseDate(d.date),
    value: d.value
  }));

  // Declare the x (horizontal position) scale
  const x = d3.scaleTime()
    .domain(d3.extent(processedData, d => d.date))
    .range([marginLeft, width - marginRight]);

  // Declare the y (vertical position) scale
  const y = d3.scaleLinear()
    .domain(d3.extent(processedData, d => d.value))
    .range([height - marginBottom, marginTop]);

  // Declare the line generator
  const line = d3.line()
    .x(d => x(d.date))
    .y(d => y(d.value));

  // Create the SVG container
  const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto;");

  // Add the x-axis
  svg.append("g")
    .attr("transform", \`translate(0,\${height - marginBottom})\`)
    .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0));

  // Add the y-axis
  svg.append("g")
    .attr("transform", \`translate(\${marginLeft},0)\`)
    .call(d3.axisLeft(y))
    .call(g => g.select(".domain").remove())
    .call(g => g.append("text")
      .attr("x", -marginLeft)
      .attr("y", 10)
      .attr("fill", "currentColor")
      .attr("text-anchor", "start")
      .text("↑ Value"));

  // Append a path for the line
  svg.append("path")
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.5)
    .attr("d", line(processedData));

  return svg.node();
}`
  },
  {
    chartId: 'scatterplot',
    defaultData: `[
  { "x": 10, "y": 20, "category": "A" },
  { "x": 15, "y": 35, "category": "B" },
  { "x": 25, "y": 15, "category": "A" },
  { "x": 30, "y": 45, "category": "C" },
  { "x": 35, "y": 25, "category": "B" },
  { "x": 40, "y": 55, "category": "C" },
  { "x": 45, "y": 30, "category": "A" },
  { "x": 50, "y": 40, "category": "B" },
  { "x": 55, "y": 60, "category": "C" },
  { "x": 60, "y": 35, "category": "A" }
]`,
    transformationLogic: `function transformData(data) {
  // Scatterplot Transformation Logic
  const width = 928;
  const height = 500;
  const marginTop = 20;
  const marginRight = 30;
  const marginBottom = 30;
  const marginLeft = 40;

  // Declare the x (horizontal position) scale
  const x = d3.scaleLinear()
    .domain(d3.extent(data, d => d.x))
    .range([marginLeft, width - marginRight]);

  // Declare the y (vertical position) scale
  const y = d3.scaleLinear()
    .domain(d3.extent(data, d => d.y))
    .range([height - marginBottom, marginTop]);

  // Color scale for categories
  const color = d3.scaleOrdinal()
    .domain([...new Set(data.map(d => d.category))])
    .range(d3.schemeCategory10);

  // Create the SVG container
  const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto;");

  // Add the x-axis
  svg.append("g")
    .attr("transform", \`translate(0,\${height - marginBottom})\`)
    .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0));

  // Add the y-axis
  svg.append("g")
    .attr("transform", \`translate(\${marginLeft},0)\`)
    .call(d3.axisLeft(y))
    .call(g => g.select(".domain").remove())
    .call(g => g.append("text")
      .attr("x", -marginLeft)
      .attr("y", 10)
      .attr("fill", "currentColor")
      .attr("text-anchor", "start")
      .text("↑ Y Value"));

  // Add dots
  svg.append("g")
    .attr("stroke", "white")
    .attr("stroke-width", 1.5)
    .selectAll()
    .data(data)
    .join("circle")
    .attr("cx", d => x(d.x))
    .attr("cy", d => y(d.y))
    .attr("r", 5)
    .attr("fill", d => color(d.category));

  return svg.node();
}`
  }
];

export const getTransformationTemplate = (chartId: string): TransformationTemplate | null => {
  return transformationTemplates.find(template => template.chartId === chartId) || null;
};