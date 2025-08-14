import * as d3 from 'd3';

type Datum = Record<string, string | number>

interface BarChartData {
  title?: string
  x: string
  y: string
  data: Datum[]
}

// One row of Bar Chart data
export interface BarChartDatum {
  label: string;
  value: number;
}

// Bar Chart full data
export interface BarChartSpec {
  title?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  data: BarChartDatum[];
}

// D3.js 기반 BarChart 렌더러
export function renderBarChart0(container: HTMLElement, chartData: BarChartData, spec: BarChartSpec, options: Partial<BarChartOptions> = {}) {

    const { title, x, y, data } = chartData
    
    const width = 400
    const height = 250
    const margin = { top: 40, right: 20, bottom: 40, left: 50 }

  const showGrid = true;
  const showValues = false;
//       const opts = { ...defaultBarChartOptions, ...options };
//   const { width, height, margin } = opts;
//   const showGrid = opts.showGrid ?? false;
//   const showValues = opts.showValues ?? false;
  const titleHeight = title ? 80 : 0;
  const chartMarginTop = margin.top + titleHeight;
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - chartMarginTop - margin.bottom;
//   const labels = spec.data.map(d => d.label);
//   const values = spec.data.map(d => d.value);

const labels = data.map(d => String(d[x]))
const values = d3.max(data, d => Number(d[y])) ?? 100
  const maxValue = d3.max(data, d => Number(d[y])) ?? 100

  // D3 SVG 생성
//   const svg = d3.create('svg')
//     .attr('width', width)
//     .attr('height', height)
//     .attr('xmlns', 'http://www.w3.org/2000/svg');

//   // 배경
//   svg.append('rect')
//     .attr('width', width)
//     .attr('height', height)
//     .attr('fill', CHART_STYLES.backgroundColor);


    const svg = d3.select(container)
    .append('svg')
    .attr('width', width)
    .attr('height', height)

    // 제목
    if (title) {
    svg.append('text')
        .attr('x', width / 2)
        .attr('y', margin.top / 2)
        .attr('text-anchor', 'middle')
        .attr('font-size', '16px')
        .attr('font-weight', 'bold')
        .text(title)
    }

//   // 타이틀
//   if (spec.title) {
//     svg.append('text')
//       .attr('x', width / 2)
//       .attr('y', margin.top + 30)
//       .attr('text-anchor', 'middle')
//       .attr('font-size', 24)
//       .attr('font-weight', 'bold')
//       .attr('fill', CHART_STYLES.titleColor)
//       .text(spec.title);
//   }

  // y축 scale
  const yScale = d3.scaleLinear()
    .domain([0, maxValue])
    .range([chartHeight, 0]);

  // x축 scale
  const xScale = d3.scaleBand()
    .domain(labels)
    .range([0, chartWidth])
    .padding(0.2);


      // X축
      const xAxis = d3.axisBottom(xScale)

  // bar 영역 그룹
  const chartG = svg.append('g')
    .attr('transform', `translate(${margin.left},${chartMarginTop})`);

  // grid lines
  if (showGrid) {
    chartG.append('g')
      .selectAll('line')
      .data(yScale.ticks(5))
      .join('line')
      .attr('x1', 0)
      .attr('x2', chartWidth)
  .attr('y1', (d: number) => yScale(d))
  .attr('y2', (d: number) => yScale(d))
      .attr('stroke', CHART_STYLES.gridColor)
      .attr('stroke-width', 1);
    chartG.append('g')
      .selectAll('text')
      .data(yScale.ticks(5))
      .join('text')
      .attr('x', -10)
  .attr('y', (d: number) => yScale(d) + 4)
  .attr('text-anchor', 'end')
  .attr('font-size', 12)
  .attr('fill', CHART_STYLES.axisLabelColor)
  .text((d: number) => d);
  }

  // bars
  chartG.append('g')
    .selectAll('rect')
    .data(spec.data)
    .join('rect')
  .attr('x', (d: BarChartDatum) => xScale(d.label)!)
  .attr('y', (d: BarChartDatum) => yScale(d.value))
  .attr('width', xScale.bandwidth())
  .attr('height', (d: BarChartDatum) => chartHeight - yScale(d.value))
  .attr('fill', 'url(#bar-gradient)');

  // bar 값 표시
  if (showValues) {
    chartG.append('g')
      .selectAll('text.value')
      .data(spec.data)
      .join('text')
      .attr('class', 'value')
  .attr('x', (d: BarChartDatum) => xScale(d.label)! + xScale.bandwidth() / 2)
  .attr('y', (d: BarChartDatum) => yScale(d.value) - 5)
  .attr('text-anchor', 'middle')
  .attr('font-size', 12)
  .attr('fill', CHART_STYLES.labelColor)
  .attr('font-weight', 'bold')
  .text((d: BarChartDatum) => d.value);
  }

  // x축 라벨
  chartG.append('g')
    .selectAll('text.label')
    .data(spec.data)
    .join('text')
    .attr('class', 'label')
  .attr('x', (d: BarChartDatum) => xScale(d.label)! + xScale.bandwidth() / 2)
  .attr('y', chartHeight + 15)
  .attr('text-anchor', 'middle')
  .attr('font-size', 13)
  .attr('fill', CHART_STYLES.labelColor)
  .text((d: BarChartDatum) => d.label);

  // x/y축
  chartG.append('line')
    .attr('x1', 0)
    .attr('y1', 0)
    .attr('x2', 0)
    .attr('y2', chartHeight)
    .attr('stroke', CHART_STYLES.axisColor)
    .attr('stroke-width', 2);
  chartG.append('line')
    .attr('x1', 0)
    .attr('y1', chartHeight)
    .attr('x2', chartWidth)
    .attr('y2', chartHeight)
    .attr('stroke', CHART_STYLES.axisColor)
    .attr('stroke-width', 2);

  // 축 라벨
  if (spec.xAxisLabel) {
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', height - 30)
      .attr('text-anchor', 'middle')
      .attr('font-size', 18)
      .attr('font-weight', 'bold')
      .attr('fill', CHART_STYLES.axisLabelColor)
      .text(spec.xAxisLabel);
  }
  if (spec.yAxisLabel) {
    svg.append('text')
      .attr('x', 50)
      .attr('y', height / 2 - 10)
      .attr('text-anchor', 'middle')
      .attr('font-size', 18)
      .attr('font-weight', 'bold')
      .attr('fill', CHART_STYLES.axisLabelColor)
      .attr('transform', `rotate(-90, 40, ${height / 2})`)
      .text(spec.yAxisLabel);
  }

  // gradient 정의 (SVG root에 직접 추가)
  svg.append('defs').html(`<linearGradient id="bar-gradient" x1="0%" y1="0%" x2="0%" y2="100%">${CHART_STYLES.barGradient.map(g => `<stop offset='${g.offset}' style='stop-color:${g.color};stop-opacity:${g.opacity}' />`).join('')}</linearGradient>`);

  return svg.node()!.outerHTML;
}

function specToBarChartData(spec: BarChartSpec): { labels: string[]; values: number[]; title?: string; xAxisLabel?: string; yAxisLabel?: string } {
  // BarChartSpec → labels/values 배열로 변환 (렌더러 내부에서만 사용)
  return {
    labels: spec.data.map((d: BarChartDatum) => d.label),
    values: spec.data.map((d: BarChartDatum) => d.value),
    title: spec.title,
    xAxisLabel: spec.xAxisLabel,
    yAxisLabel: spec.yAxisLabel,
  };
}


export interface BarChartOptions {
  width: number;
  height: number;
  margin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  barColor?: string;
  backgroundColor?: string;
  showGrid?: boolean;
  showValues?: boolean;
}

const CHART_STYLES = {
  barGradient: [
    { offset: '0%', color: '#fef3c7', opacity: 1 },
    { offset: '50%', color: '#fde68a', opacity: 0.9 },
    { offset: '100%', color: '#f59e0b', opacity: 0.8 },
  ],
  backgroundColor: '#ffffff',
  axisColor: '#374151',
  gridColor: '#e5e7eb',
  labelColor: '#374151',
  axisLabelColor: '#6b7280',
  titleColor: '#111827',
};

export const defaultBarChartOptions: BarChartOptions = {
  width: 600,
  height: 400,
  margin: { top: 30, right: 50, bottom: 100, left: 100 },
  backgroundColor: CHART_STYLES.backgroundColor,
  showGrid: true,
  showValues: true,
};

function renderTitle(title: string | undefined, width: number, marginTop: number): string {
  if (!title) return '';
  return `<g><text x="${width / 2}" y="${marginTop + 30}" text-anchor="middle" font-size="24" font-weight="bold" fill="${CHART_STYLES.titleColor}">${title}</text></g>`;
}

function renderGrid(maxValue: number, chartMarginTop: number, chartHeight: number, gridLines: number, margin: BarChartOptions['margin'], width: number, showGrid: boolean): string {
  if (!showGrid) return '';
  let grid = '';
  for (let i = 0; i <= gridLines; i++) {
    const y = chartMarginTop + (chartHeight / gridLines) * i;
    const value = (maxValue / gridLines) * (gridLines - i);
    grid += `<line x1="${margin.left}" y1="${y}" x2="${width - margin.right}" y2="${y}" stroke="${CHART_STYLES.gridColor}" stroke-width="1"/>`;
    grid += `<text x="${margin.left - 10}" y="${y + 4}" text-anchor="end" font-size="12" fill="${CHART_STYLES.axisLabelColor}">${value.toFixed(0)}</text>`;
  }
  return grid;
}

function renderBarDefs(): string {
  return `<defs><linearGradient id="bar-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
    ${CHART_STYLES.barGradient.map(g => `<stop offset="${g.offset}" style="stop-color:${g.color};stop-opacity:${g.opacity}" />`).join('')}
  </linearGradient></defs>`;
}

function renderBars(labels: string[], values: number[], chartWidth: number, chartHeight: number, margin: BarChartOptions['margin'], chartMarginTop: number, yScale: number, height: number, showValues: boolean): string {
  const barWidth = chartWidth / labels.length * 0.8;
  const barSpacing = chartWidth / labels.length * 0.2;
  let bars = '';
  labels.forEach((label, index) => {
    const value = values[index];
    const barHeight = value * yScale;
    const x = margin.left + index * (barWidth + barSpacing) + barSpacing / 2;
    const y = chartMarginTop + chartHeight - barHeight;
    bars += `<rect x="${x}" y="${y}" width="${barWidth}" height="${barHeight}" fill="url(#bar-gradient)" rx="3"/>`;
    if (showValues) {
      bars += `<text x="${x + barWidth / 2}" y="${y - 5}" text-anchor="middle" font-size="12" fill="${CHART_STYLES.labelColor}" font-weight="bold">${value}</text>`;
    }
  bars += `<text x="${x + barWidth / 2}" y="${height - margin.bottom + 15}" text-anchor="middle" font-size="13" fill="${CHART_STYLES.labelColor}">${label}</text>`;
  });
  return bars;
}

function renderAxes(margin: BarChartOptions['margin'], chartMarginTop: number, height: number, chartWidth: number, width: number): string {
  return `<line x1="${margin.left}" y1="${chartMarginTop}" x2="${margin.left}" y2="${height - margin.bottom}" stroke="${CHART_STYLES.axisColor}" stroke-width="2"/>` +
    `<line x1="${margin.left}" y1="${height - margin.bottom}" x2="${width - margin.right}" y2="${height - margin.bottom}" stroke="${CHART_STYLES.axisColor}" stroke-width="2"/>`;
}

function renderAxisLabels(xAxisLabel: string | undefined, yAxisLabel: string | undefined, width: number, height: number): string {
  let labels = '';
  if (xAxisLabel) {
    labels += `<text x="${width / 2}" y="${height - 30}" text-anchor="middle" font-size="18" font-weight="bold" fill="${CHART_STYLES.axisLabelColor}">${xAxisLabel}</text>`;
  }
  if (yAxisLabel) {
    labels += `<text x="50" y="${height / 2 - 10}" text-anchor="middle" font-size="18" font-weight="bold" fill="${CHART_STYLES.axisLabelColor}" transform="rotate(-90, 40, ${height / 2})">${yAxisLabel}</text>`;
  }
  return labels;
}
