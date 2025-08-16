import tableToArray from '../utils/tableToArray'
import handleDiscover from './handleDiscover'
import handlePlaceFlag from './handlePlaceFlag'
import { handleStopwatch } from './handleStopwatch'

export const handleClickingLogic = () => {
	const cells = document.querySelectorAll('.cell')
	const board = document.querySelector('table')

	cells.forEach(c => {
		// Normal click, to reveal the number in the cell
		c.addEventListener('click', () => {
			if (document.getElementById('timeCounter')?.textContent === '') {
				handleStopwatch()
			}

			const id = c.id.split('-')
			handleDiscover(tableToArray(board as HTMLTableElement), +id[0], +id[1], c)
		})

		// Right click, to place a flag
		c.addEventListener('contextmenu', e => {
			if (document.getElementById('timeCounter')?.textContent === '') {
				handleStopwatch()
			}
			handlePlaceFlag(c, e)
		})
	})
}
