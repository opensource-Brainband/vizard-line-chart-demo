type Datum = Record<string, string | number>

interface TableData {
  title?: string
  x: string
  y: string
  data: Datum[]
}

export function renderTable(container: HTMLElement, tableData: TableData) {

  console.log("table")

  const { title, x, y, data } = tableData
  const columns = [x, y]

  if (title) {
    const h3 = document.createElement('h3')
    h3.textContent = title
    container.appendChild(h3)
  }

  const table = document.createElement('table')
  table.style.borderCollapse = 'collapse'
  table.style.width = '100%'

  // 헤더
  const thead = document.createElement('thead')
  const headerRow = document.createElement('tr')
  columns.forEach(col => {
    const th = document.createElement('th')
    th.textContent = col
    th.style.border = '1px solid #ccc'
    th.style.padding = '4px'
    th.style.backgroundColor = '#f5f5f5'
    headerRow.appendChild(th)
  })
  thead.appendChild(headerRow)
  table.appendChild(thead)

  // 본문
  const tbody = document.createElement('tbody')
  data.forEach(row => {
    const tr = document.createElement('tr')
    columns.forEach(col => {
      const td = document.createElement('td')
      td.textContent = String(row[col] ?? '')
      td.style.border = '1px solid #ccc'
      td.style.padding = '4px'
      tr.appendChild(td)
    })
    tbody.appendChild(tr)
  })
  table.appendChild(tbody)

  container.appendChild(table)
}
