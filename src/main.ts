import './style.css'
import { createGrid } from './functions/createGrid.ts'
import renderMatrix from './functions/renderMatrix.ts'
import handlePlaceFlag from './functions/handlePlaceFlag.ts'
import tableToArray from './utils/tableToArray.ts'
import handleDiscover from './functions/handleDiscover.ts'
import { handleReset } from './functions/handleReset.ts'
import { handleStopwatch } from './functions/handleStopwatch.ts'

const grid = createGrid(10)

const handleClickingLogic = () => {
	const cells = document.querySelectorAll('.cell')
	const board = document.querySelector('table')

	cells.forEach(c => {
		c.addEventListener('click', () => {
			if (document.getElementById('timeCounter')?.textContent === '') {
				handleStopwatch()
			}

			const id = c.id.split('-')
			handleDiscover(tableToArray(board as HTMLTableElement), +id[0], +id[1], c)
		})

		c.addEventListener('contextmenu', e => {
			if (document.getElementById('timeCounter')?.textContent === '') {
				handleStopwatch()
			}
			handlePlaceFlag(c, e)
		})
	})
}

renderMatrix(grid)

handleClickingLogic()
handleReset()
