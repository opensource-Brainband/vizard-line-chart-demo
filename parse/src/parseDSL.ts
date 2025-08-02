type ParsedDSL = {
  title: string
  type: string
  x: string
  y: string
  data: Record<string, string | number>[]
}

export default function parseDSL(input: string): ParsedDSL {
  const lines = input.split('\n').map(line => line.trim()).filter(Boolean)

  let title = ''
  let type = ''
  let x = ''
  let y = ''
  const data: Record<string, string | number>[] = []

  let inDataSection = false

  for (const line of lines) {
    if (line.startsWith('title:')) {
      title = line.replace('title:', '').trim()
    } else if (line.startsWith('type:')) {
      type = line.replace('type:', '').trim()
    } else if (line.startsWith('x:')) {
      x = line.replace('x:', '').trim()
    } else if (line.startsWith('y:')) {
      y = line.replace('y:', '').trim()
    } else if (line.startsWith('data:')) {
      inDataSection = true
    } else if (inDataSection) {
      const [xVal, yVal] = line.split(',').map(v => v.trim())
      data.push({
        [x]: xVal,
        [y]: isNaN(Number(yVal)) ? yVal : Number(yVal)
      })
    }
  }

  return { title, type, x, y, data }
}
