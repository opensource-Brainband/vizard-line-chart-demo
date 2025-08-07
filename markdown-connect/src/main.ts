import './style.css'
import { createMarkdownRenderer } from './markdown'
import { renderLineChart } from './renderLineChart'
import markdownText from '../docs/test.md?raw'

const md = createMarkdownRenderer()

window.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app')
  if (app) {
    app.innerHTML = md.render(markdownText)

    // 마크다운 렌더링 후에 DSL 차트 렌더링 시작
    setTimeout(() => {
      document.querySelectorAll('.dsl-chart').forEach((el) => {
        const encoded = el.getAttribute('data-chart')
        if (encoded) {
          const chartData = JSON.parse(decodeURIComponent(encoded))
          renderLineChart(el as HTMLElement, chartData)
        }
      })
    }, 0)
  }
})