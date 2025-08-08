export interface ParsedCSV {
  title: string
  type: string
  x: string
  y: string
  data: Record<string, string | number>[]
}

export default function parseCSV(
  content: string,
  info: string
): ParsedCSV {
  // info에서 title, type 추출
  const titleMatch = info.match(/title="([^"]+)"/)
  const typeMatch = info.match(/type="([^"]+)"/)

  const title = titleMatch ? titleMatch[1] : ''
  const type = typeMatch ? typeMatch[1] : ''

  const lines = content
    .split('\n')
    .map(l => l.trim())
    .filter(Boolean)

  if (lines.length < 2) {
    throw new Error('CSV 데이터가 비어있습니다.')
  }

  const headers = lines[0].split(',').map(h => h.trim())
  if (headers.length < 2) {
    throw new Error('CSV 헤더는 최소 2개 컬럼이 필요합니다.')
  }

  const [x, y] = headers
  const data = lines.slice(1).map(line => {
    const [xVal, yVal] = line.split(',').map(v => v.trim())
    return {
      [x]: xVal,
      [y]: isNaN(Number(yVal)) ? yVal : Number(yVal)
    }
  })

  return { title, type, x, y, data }
}