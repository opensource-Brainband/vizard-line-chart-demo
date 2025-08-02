import * as d3 from "d3";
import parseDSL from "./parseDSL";

// interface DataPoint {
//   date: Date;
//   value: number;
// }

// const width = 800;
// const height = 400;
// const margin = { top: 20, right: 30, bottom: 30, left: 40 };

// const svg = d3.select("svg")
//   .attr("width", width)
//   .attr("height", height);

// d3.csv("/data.csv", (d): DataPoint => ({
//   date: d3.timeParse("%Y-%m-%d")(d.date!) as Date,
//   value: +d.value!
// })).then((data: DataPoint[]) => {
//   const x = d3.scaleTime()
//     .domain(d3.extent(data, d => d.date) as [Date, Date])
//     .range([margin.left, width - margin.right]);

//   const y = d3.scaleLinear()
//     .domain([0, d3.max(data, d => d.value)!])
//     .nice()
//     .range([height - margin.bottom, margin.top]);

//   svg.append("g")
//     .attr("transform", `translate(0,${height - margin.bottom})`)
//     .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0));

//   svg.append("g")
//     .attr("transform", `translate(${margin.left},0)`)
//     .call(d3.axisLeft(y));

//   const line = d3.line<DataPoint>()
//     .x(d => x(d.date))
//     .y(d => y(d.value));

//   svg.append("path")
//     .datum(data)
//     .attr("fill", "none")
//     .attr("stroke", "steelblue")
//     .attr("stroke-width", 1.5)
//     .attr("d", line);
// });

const dslText = `
title: 친구 키
type: line
x: 이름
y: 키
data:
민호,180
민서,173
주현,168
`

console.log(parseDSL(dslText))