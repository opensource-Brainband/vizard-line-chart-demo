import MarkdownIt from 'markdown-it'
import parseDSL from './parseDSL'

import type Token from 'markdown-it/lib/token.mjs'
import type Renderer from 'markdown-it/lib/renderer.mjs'

interface FenceCustomRule {
  [key: string]: (...args: any[]) => string
}

declare module 'markdown-it/lib/renderer.mjs' {
  interface RenderRuleRecord {
    fence_custom?: FenceCustomRule
  }
}


export function createMarkdownRenderer(): MarkdownIt {
  const md = new MarkdownIt()

  const customRules = (md.renderer.rules.fence_custom ||= {})

  // DSL 전용 코드 블럭 렌더링 정의
  customRules['dsl'] = (
    tokens: Token[],
    idx: number,
    options,
    env,
    self: Renderer
  ): string => {
    const content = tokens[idx].content
    const parsed = parseDSL(content)

    if (parsed.type === 'line') {
      const id = `chart-${Math.random().toString(36).slice(2)}`
      const encoded = encodeURIComponent(JSON.stringify(parsed))
      return `<div class="dsl-chart" id="${id}" data-chart="${encoded}"></div>`
    }

    return `<pre><code>${md.utils.escapeHtml(content)}</code></pre>`
  }

  return md
}
