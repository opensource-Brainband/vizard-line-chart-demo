import './style.css'
import { createMarkdownRenderer } from './markdown'
import { renderLineChart } from './renderLineChart.ts'
import { renderBarChart } from './renderBarChart.ts'
import { renderTable } from './renderTable.ts'
import markdownText from '../docs/test.md?raw'
import { welcomeHtml } from './views/welcomeHtml'
import { getMarkdownAppHtml } from './views/markdownAppHtml'

const md = createMarkdownRenderer()

function renderWelcome(root: HTMLElement) {
  root.innerHTML = welcomeHtml
  const btn = document.getElementById('get-started-btn')
  if (btn) {
    btn.addEventListener('click', () => renderMarkdownApp(root))
  }
}

function renderMarkdownApp(root: HTMLElement) {
  root.innerHTML = getMarkdownAppHtml(markdownText)
  const textarea = document.getElementById('md-editor') as HTMLTextAreaElement | null
  const preview = document.getElementById('app-preview')
  function updatePreview(mdText: string) {
    if (preview) {
      preview.innerHTML = md.render(mdText)
      setTimeout(() => {
        preview.querySelectorAll<HTMLElement>('.dsl-chart').forEach((el) => {
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
  }
  if (textarea) {
    updatePreview(textarea.value)
    textarea.addEventListener('input', (e) => {
      updatePreview((e.target as HTMLTextAreaElement).value)
    })
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root')
  if (root) {
    renderWelcome(root)
  }
})