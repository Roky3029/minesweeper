const tableToArray = (table: HTMLTableElement): (number | string)[][] => {
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

export default tableToArray
