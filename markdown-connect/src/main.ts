import './style.css'
import { createMarkdownRenderer } from './markdown'
import { renderLineChart } from './renderLineChart.ts'
import { renderBarChart } from './renderBarChart.ts'
import { renderTable } from './renderTable.ts'
import markdownText from '../docs/test.md?raw'

const md = createMarkdownRenderer()

window.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app')
  if (app) {
    app.innerHTML = md.render(markdownText)

    // 마크다운 렌더링 후에 DSL 차트 렌더링 시작
    setTimeout(() => {
      document.querySelectorAll<HTMLElement>('.dsl-chart').forEach((el) => {
        const encoded = el.getAttribute('data-chart')
        const chartType = el.getAttribute('data-chart-type')
        if (!encoded) return

        const chartData = JSON.parse(decodeURIComponent(encoded))
        
        switch (chartType) {
          case 'line':
            renderLineChart(el, chartData)
            break
          case 'bar':
            renderBarChart(el, chartData)
            break
          default:
            renderTable(el, chartData)
            break
        }
      })
    }, 0)
  }
})