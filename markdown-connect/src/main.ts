import './style.css'
import { createMarkdownRenderer } from './markdown'
import { renderLineChart } from './renderLineChart.ts'
import { renderBarChart } from './renderBarChart.ts'
import { renderTable } from './renderTable.ts'
import markdownText from '../docs/test.md?raw'
import { welcomeHtml } from './views/welcomeHtml'
import { getMarkdownAppHtml } from './views/markdownAppHtml'

const md = createMarkdownRenderer()

// Render the welcome screen
function renderWelcome(root: HTMLElement) {
  root.innerHTML = welcomeHtml
  const btn = document.getElementById('get-started-btn')
  if (btn) {
    // On click, show the markdown editor/preview UI
    btn.addEventListener('click', () => renderMarkdownApp(root))
  }
}

// Render the markdown editor/preview UI
function renderMarkdownApp(root: HTMLElement) {
  root.innerHTML = getMarkdownAppHtml(markdownText)
  const textarea = document.getElementById('md-editor') as HTMLTextAreaElement | null
  const preview = document.getElementById('app-preview')

  // Update preview area with rendered markdown and charts
  function updatePreview(mdText: string) {
    if (preview) {
      preview.innerHTML = md.render(mdText)
      // After rendering markdown, render charts for .dsl-chart blocks
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
    // Initial preview
    updatePreview(textarea.value)
    // Live update on textarea input
    textarea.addEventListener('input', (e) => {
      updatePreview((e.target as HTMLTextAreaElement).value)
    })
  }
}

// App entrypoint: show welcome screen on load
window.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root')
  if (root) {
    renderWelcome(root)
  }
})