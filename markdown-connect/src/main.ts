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
  const csvText = document.getElementById('csv-upload-text') as HTMLSpanElement | null
  const csvInput = document.getElementById('csv-upload-input') as HTMLInputElement | null
  const mdText = document.getElementById('md-upload-text') as HTMLSpanElement | null
  const mdInput = document.getElementById('md-upload-input') as HTMLInputElement | null
  const clearText = document.getElementById('clear-data-text') as HTMLSpanElement | null

  if (clearText && textarea) {
    clearText.addEventListener('click', () => {
      textarea.value = ''
      textarea.focus()
      updatePreview('')
    })
  }
  if (csvText && csvInput && textarea) {
    csvText.addEventListener('click', () => {
      csvInput.value = '' // Allow re-uploading the same file
      csvInput.click()
    })
    csvInput.addEventListener('change', () => {
      const file = csvInput.files && csvInput.files[0]
      if (!file) return
      const reader = new FileReader()
      reader.onload = (ev) => {
        const csvText = ev.target?.result as string
        const codeBlock = `\n\n\`\`\`csv\n${csvText.trim()}\n\`\`\`\n\n`
        const start = textarea.selectionStart
        const end = textarea.selectionEnd
        const before = textarea.value.substring(0, start)
        const after = textarea.value.substring(end)
        textarea.value = before + codeBlock + after
        textarea.selectionStart = textarea.selectionEnd = (before + codeBlock).length
        textarea.focus()
        updatePreview(textarea.value)
      }
      reader.readAsText(file)
    })
  }
  if (mdText && mdInput && textarea) {
    mdText.addEventListener('click', () => {
      mdInput.value = ''
      mdInput.click()
    })
    mdInput.addEventListener('change', () => {
      const file = mdInput.files && mdInput.files[0]
      if (!file) return
      const reader = new FileReader()
      reader.onload = (ev) => {
        const mdText = ev.target?.result as string
        const start = textarea.selectionStart
        const end = textarea.selectionEnd
        const before = textarea.value.substring(0, start)
        const after = textarea.value.substring(end)
        textarea.value = before + mdText + after
        textarea.selectionStart = textarea.selectionEnd = (before + mdText).length
        textarea.focus()
        updatePreview(textarea.value)
      }
      reader.readAsText(file)
    })
  }

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