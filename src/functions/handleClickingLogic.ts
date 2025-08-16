import { calcNumbers, placeMines } from './generateBoard'
import handleDiscover from './handleDiscover'
import handlePlaceFlag from './handlePlaceFlag'
import { handleStopwatch } from './handleStopwatch'
import renderMatrix from './renderMatrix'

export const handleClickingLogic = (grid: any[][]) => {
	const cells = document.querySelectorAll('.cell')

	cells.forEach(c => {
		// Normal click, to reveal the number in the cell
		c.addEventListener('click', () => {
			if (document.getElementById('timeCounter')?.textContent === '') {
				handleStopwatch()
			}
			const [row, col] = c.id.split('-')
			if ((c as HTMLElement).dataset.value === 'undefined') {
				placeMines(grid, 0.1, +row, +col)
				calcNumbers(grid)
				renderMatrix(grid)
				handleClickingLogic(grid)
			}

			const element = document.getElementById(`${row}-${col}`)
			handleDiscover(grid, +row, +col, element)
		})

		// Right click, to place a flag
		c.addEventListener('contextmenu', e => {
			e.preventDefault()
			if ((c as HTMLElement).dataset.value !== 'undefined')
				handlePlaceFlag(c, e)
			// if (document.getElementById('timeCounter')?.textContent === '') {
			// 	handleStopwatch()
			// }
		})
	})
}
