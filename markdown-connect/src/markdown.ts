import MarkdownIt from 'markdown-it'
import parseCSV from './parseCSV'
                      
export function createMarkdownRenderer(): MarkdownIt {
  const md = new MarkdownIt()
  const defaultFence = md.renderer.rules.fence!

  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    const info = token.info.trim()
    const [langName] = info.split(/\s+/)

    if (langName === 'csv') {
      const parsed = parseCSV(token.content, info)

      // 코드 원본
      const codeHtml = `<pre><code class="language-csv">${md.utils.escapeHtml(token.content)}</code></pre>`

      // 차트
      if (parsed.type === 'line') {
        const id = `chart-${Math.random().toString(36).slice(2)}`
        const encoded = encodeURIComponent(JSON.stringify(parsed))
        const chartHtml = `<div class="dsl-chart" id="${id}" data-chart="${encoded}"></div>`
        return `${codeHtml}\n${chartHtml}`
      }

      return codeHtml
    }

    return defaultFence(tokens, idx, options, env, self)
  }

  return md
}