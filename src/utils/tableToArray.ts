export const tableToArray = (
	table: HTMLTableElement
): (number | string)[][] => {
	if (!table) {
		throw new Error('Tabla no encontrada')
	}

	const array: (number | string)[][] = []

	for (const row of table.rows) {
		const rowData: (number | string)[] = []
		for (const cell of row.cells) {
			const value = cell.textContent?.trim() // Trim to remove extra spaces
			if (value === 'M') {
				rowData.push('M') // Keep "M" as a string
			} else {
				rowData.push(parseInt(value || '0', 10)) // Convert to number
			}
		}
		array.push(rowData)
	}

	return array
}

const arrayToTable = (data: (number | string)[][]): HTMLTableElement => {
	if (!data || data.length === 0) {
		throw new Error('Array vacío')
	}

	const table = document.createElement('table')

	for (const rowData of data) {
		const row = document.createElement('tr')

		for (const cellData of rowData) {
			const cell = document.createElement('td')
			cell.textContent = String(cellData) // Keep "M" as string, numbers auto-convert
			row.appendChild(cell)
		}

		table.appendChild(row)
	}

	return table
}

export default arrayToTable
