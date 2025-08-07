import * as d3 from 'd3'

type Datum = Record<string, string | number>

interface LineChartData {
  title?: string
  x: string         // x축으로 사용할 속성 이름
  y: string         // y축으로 사용할 속성 이름
  data: Datum[]     // 데이터 배열 (각 항목은 string | number 값 가짐)
}

export function renderLineChart(container: HTMLElement, chartData: LineChartData) {
  console.log('[DEBUG] renderLineChart 호출됨:', chartData)  // ✅ 여기 추가
  const { title, x, y, data } = chartData

  const width = 400
  const height = 200

  const svg = d3.select(container)
    .append('svg')
    .attr('width', width)
    .attr('height', height)

  const xScale = d3.scalePoint<string>()
    .domain(data.map(d => String(d[x])))
    .range([40, width - 20])

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => Number(d[y])) ?? 100])
    .range([height - 30, 10])

  const line = d3.line<Datum>()
    .x(d => xScale(String(d[x]))!)
    .y(d => yScale(Number(d[y])))

  svg.append('path')
    .datum(data)
    .attr('fill', 'none')
    .attr('stroke', '#0077cc')
    .attr('stroke-width', 2)
    .attr('d', line)

  svg.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', d => xScale(String(d[x]))!)
    .attr('cy', d => yScale(Number(d[y])))
    .attr('r', 3)
    .attr('fill', '#0077cc')
}