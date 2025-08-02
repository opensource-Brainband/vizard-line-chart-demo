import { createMarkdownRenderer } from './markdown'
import { renderLineChart } from './renderLineChart.ts'

const markdownText = `\`\`\`dsl
title: 친구 키
type: line
x: 이름
y: 키
data:
민호,180
민서,173
주현,168
\`\`\``

const md = createMarkdownRenderer()
document.querySelector('#app')!.innerHTML = md.render(markdownText)

// 마운트 후 D3 렌더링
document.querySelectorAll('.dsl-chart').forEach((el) => {
  const chartData = JSON.parse(el.getAttribute('data-chart')!)
  renderLineChart(el as HTMLElement, chartData)
})
