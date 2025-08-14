import './style.css'
import { createMarkdownRenderer } from './markdown'
import { renderLineChart } from './renderLineChart.ts'
import { renderBarChart } from './renderBarChart.ts'
import { renderTable } from './renderTable.ts'
import markdownText from '../docs/test.md?raw'

const md = createMarkdownRenderer()

function getWelcomeHTML() {
  return `
    <div style="width: 100vw; min-height: 100vh; background: white; overflow: hidden; flex-direction: column; justify-content: flex-start; align-items: center; display: flex">
      <div style="align-self: stretch; height: 80px; padding: 20px; background: #21203C; overflow: hidden; justify-content: center; align-items: center; display: flex">
        <div style="color: white; font-size: 32px; font-family: Pretendard, sans-serif; font-weight: 500; word-wrap: break-word">Vizard</div>
      </div>
      <div style="flex: 1 1 0; padding-top: 10px; padding-bottom: 10px; overflow: hidden; flex-direction: column; justify-content: center; align-items: center; display: flex">
        <div style="padding-left: 90px; padding-right: 90px; overflow: hidden; flex-direction: column; justify-content: center; align-items: center; gap: 60px; display: flex">
          <div style="text-align: center; color: black; font-size: 50px; font-family: Pretendard Variable, Pretendard, sans-serif; font-weight: 500; word-wrap: break-word">Welcome to Vizard</div>
          <div id="get-started-btn" style="cursor:pointer; padding-left: 40px; padding-right: 40px; padding-top: 15px; padding-bottom: 15px; background: #3D3D3D; overflow: hidden; border-radius: 27px; flex-direction: column; justify-content: center; align-items: center; gap: 10px; display: flex">
            <div style="text-align: center; color: white; font-size: 20px; font-family: Pretendard Variable, Pretendard, sans-serif; font-weight: 500; word-wrap: break-word">Get Started</div>
          </div>
        </div>
      </div>
    </div>
  `
}

function getMarkdownAppHTML() {
  return `
    <div style="width: 100vw; min-height: 100vh; background: white; overflow: hidden; flex-direction: column; align-items: center; display: flex">
      <div style="align-self: stretch; height: 80px; padding: 20px; background: #21203C; overflow: hidden; justify-content: center; align-items: center; display: flex">
        <div style="color: white; font-size: 32px; font-family: Pretendard, sans-serif; font-weight: 500; word-wrap: break-word">Vizard</div>
      </div>
      <div id="app" style="width: 100%; max-width: 1200px; margin: 0 auto; padding: 20px;"></div>
    </div>
  `
}

function renderWelcome(root: HTMLElement) {
  root.innerHTML = getWelcomeHTML()
  const btn = document.getElementById('get-started-btn')
  if (btn) {
    btn.addEventListener('click', () => renderMarkdownApp(root))
  }
}

function renderMarkdownApp(root: HTMLElement) {
  root.innerHTML = getMarkdownAppHTML()
  const app = document.getElementById('app')
  if (app) {
    app.innerHTML = md.render(markdownText)
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
}

window.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root')
  if (root) {
    renderWelcome(root)
  }
})