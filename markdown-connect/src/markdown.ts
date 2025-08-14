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

      // 코드 원본 HTML
      const codeHtml = `<pre><code class="language-csv">${md.utils.escapeHtml(token.content)}</code></pre>`

      // type이 존재하는 경우에만 차트 생성
      // if (parsed.type === 'line' || parsed.type === 'bar' || parsed.type === "table") {
      return `${codeHtml}\n${generateChartHtml(parsed)}`
      // }

      // return codeHtml
    }

    return defaultFence(tokens, idx, options, env, self)
  }

  return md
}

function generateChartHtml(parsed: any) {
  const id = `chart-${Math.random().toString(36).slice(2)}`
  const encoded = encodeURIComponent(JSON.stringify(parsed))

  // 차트 타입, table 타입 구분
  return `<div 
            class="dsl-chart" 
            id="${id}" 
            data-chart="${encoded}" 
            data-chart-type="${parsed.type}">
          </div>`
}