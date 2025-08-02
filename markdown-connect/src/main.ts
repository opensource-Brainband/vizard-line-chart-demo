import './style.css'
import { createMarkdownRenderer } from './markdown'
import { renderLineChart } from './renderLineChart'

// 마크다운 텍스트 불러오기
import markdownText from '../docs/test.md?raw'

const md = createMarkdownRenderer()
document.querySelector('#app')!.innerHTML = md.render(markdownText)

// DSL 차트 렌더링
document.querySelectorAll('.dsl-chart').forEach((el) => {
  const chartData = JSON.parse(el.getAttribute('data-chart')!)
  renderLineChart(el as HTMLElement, chartData)
})
