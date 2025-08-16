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



		// Original code block HTML
		const codeHtml = `<pre><code class=\"language-csv\">${md.utils.escapeHtml(token.content)}</code></pre>`

		// Generate chart only if type exists
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

	// Distinguish chart type and table type
	return `<div \n            class=\"dsl-chart\" \n            id=\"${id}\" \n            data-chart=\"${encoded}\" \n            data-chart-type=\"${parsed.type}\">\n          </div>`
}
