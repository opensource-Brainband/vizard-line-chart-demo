// src/markdown.ts
import MarkdownIt from 'markdown-it'
import type Token from 'markdown-it/lib/token.mjs'
import parseDSL from './parseDSL'

export function createMarkdownRenderer(): MarkdownIt {
  const md = new MarkdownIt()

  const defaultFence = md.renderer.rules.fence!

  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    const langName = token.info.trim()

    if (langName === 'dsl') {
      const parsed = parseDSL(token.content)

      // DSL 코드 원본 출력
      const codeHtml = `<pre><code class="language-dsl">${md.utils.escapeHtml(token.content)}</code></pre>`

      // DSL 차트 출력
      if (parsed.type === 'line') {
        const id = `chart-${Math.random().toString(36).slice(2)}`
        const encoded = encodeURIComponent(JSON.stringify(parsed))
        const chartHtml = `<div class="dsl-chart" id="${id}" data-chart="${encoded}"></div>`

        // 코드 + 차트 둘 다 보여주기
        return `${codeHtml}\n${chartHtml}`
      }

      return codeHtml
    }

    return defaultFence(tokens, idx, options, env, self)
  }

  return md
}
