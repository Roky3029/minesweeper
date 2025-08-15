import { calcMines } from '../utils/calcMines'

const renderMatrix = (matrix: (string | number | undefined)[][]) => {
	const container = document.getElementById('matrix-container')
	const safeSquares = document.getElementById('nonMineCounter')
	;(safeSquares as HTMLElement).textContent = (
		matrix.length * matrix.length -
		calcMines(matrix.length, 0.1)
	).toString()

	// this handles the case when we want to create a new game, to prevent the boards from appearing and not being deleted
	const child = document.querySelector('table')
	if (child) child?.remove()

	const table = document.createElement('table')

	matrix.forEach((row, i) => {
		const tr = document.createElement('tr')
		row.forEach((cell, j) => {
			const td = document.createElement('td')
			// td.textContent = cell as string
			td.classList.add('cell')
			td.id = `${i}-${j}`
			td.dataset.value = cell?.toString() as string
			tr.appendChild(td)
		})
		table.appendChild(tr)
	})

	container?.appendChild(table)
}

export default renderMatrix
