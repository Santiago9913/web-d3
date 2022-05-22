/**
 * Reto 1
 */
let url =
  "https://gist.githubusercontent.com/josejbocanegra/d3b9e9775ec3a646603f49bc8d3fb90f/raw/3a39300c2a2ff8644a52e22228e900251ec5880a/population.json";

d3.json(url).then((data) => {
  const canvas = d3.select("#canvas");

  const widht = 700;
  const height = 500;
  const margin = { top: 10, left: 90, bottom: 40, right: 10 };
  const iwidth = widht - margin.left - margin.right;
  const iheight = height - margin.top - margin.bottom;

  const svg = canvas.append("svg");
  svg.attr("width", widht);
  svg.attr("height", height);

  let g = svg.append("g").attr("transform", `translate(${margin.left}, ${margin.top})`);

  const bars = g.selectAll("rect").data(data);

  const x = d3.scaleLinear().domain([0, 980000]).range([0, iwidth]);

  const y = d3
    .scaleBand()
    .domain(data.map((d) => d.name))
    .range([0, iheight])
    .padding(0.1);

  bars
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("fill", "purple")
    .attr("x", () => x(0))
    .attr("y", (d) => y(d.name))
    .attr("height", y.bandwidth())
    .attr("width", (d) => x(d.value));

  g.append("g")
    .classed("x--axis", true)
    .call(d3.axisBottom(x))
    .attr("transform", `translate(0, ${iheight})`);

  g.append("g").classed("y--axis", true).call(d3.axisLeft(y));

  g.append("text")
    .attr("text-anchor", "middle")
    .style("font-size", "14px")
    .attr("x", 370)
    .attr("y", 15)
    .text("Number of refugees VS. Country of Origin");

  g.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .style("font-size", "14px")
    .attr("x", 390)
    .attr("y", 485)
    .text("Number of Refugees");

  g.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .style("font-size", "14px")
    .attr("x", -170)
    .attr("y", -70)
    .attr("transform", "rotate(-90)")
    .text("Country of Origin");
});

/**
 * Reto 2
 */

const url2 =
  "https://gist.githubusercontent.com/josejbocanegra/000e838b77c6ec8e5d5792229c1cdbd0/raw/83cd9161e28e308ef8c5363e217bad2b6166f21a/countries.json";

d3.json(url2).then((data) => {
  const canvas = d3.select("#canvas");

  const widht = 800;
  const height = 600;
  const margin = { top: 10, left: 50, bottom: 40, right: 10 };
  const iwidth = widht - margin.left - margin.right;
  const iheight = height - margin.top - margin.bottom;

  const svg = canvas.append("svg");
  svg.attr("width", widht);
  svg.attr("height", height);

  let g = svg.append("g").attr("transform", `translate(${margin.left}, ${margin.top})`);

  const circles = g.selectAll("circle").data(data);

  const x = d3.scaleLinear().domain([0, 40000]).range([0, iwidth]);

  const y = d3.scaleLinear().domain([0, 100]).range([iheight, 0]);

  let arrayPopulations = [];
  data.forEach((e) => {
    arrayPopulations.push(parseInt(e.population));
  });

  circles
    .enter()
    .append("circle")
    .attr("class", "point")
    .attr("fill", "green")
    .attr("cx", (d) => x(d.purchasingpower))
    .attr("cy", (d) => y(d.lifeexpectancy))
    .attr("r", (d) => (d.population / Math.max.apply(null, arrayPopulations)) * 100);

  circles
    .enter()
    .append("text")
    .attr("x", (d) => x(d.purchasingpower) + 19)
    .attr("y", (d) => y(d.lifeexpectancy) + 1)
    .style("font-size", "14px")
    .text((d) => d.country);

  g.append("g")
    .classed("x--axis", true)
    .call(d3.axisBottom(x))
    .attr("transform", `translate(0, ${iheight})`);

  g.append("g").classed("y--axis", true).call(d3.axisLeft(y));

  g.append("text")
    .attr("text-anchor", "middle")
    .style("font-size", "14px")
    .attr("x", 370)
    .attr("y", 10)
    .text("Life Expectancy VS. Adquisition Power");

  g.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .style("font-size", "14px")
    .attr("x", 420)
    .attr("y", 585)
    .text("Adquisition Power");

  g.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .style("font-size", "14px")
    .attr("x", -220)
    .attr("y", -32)
    .attr("transform", "rotate(-90)")
    .text("Life Expectancy");
});
