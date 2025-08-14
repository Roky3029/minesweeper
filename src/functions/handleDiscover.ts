import { revealAdjacentCells } from '../utils/revealAdjacentCells'
import { interval } from './handleStopwatch'
import { triggerWin } from './triggerWin'

const handleDiscover = (
	board: (string | number)[][],
	x: number,
	y: number,
	htmlElement: Element | any
) => {
	if (
		!htmlElement ||
		htmlElement.classList.contains('show') ||
		htmlElement.classList.contains('flag')
	) {
		return
	}

	const colors = {
		1: 'blue',
		2: 'yellow',
		3: 'red',
		4: 'orange',
		5: 'purple',
		6: 'green',
		7: 'azure',
		8: 'grey'
	}
	const cellValue = htmlElement.dataset.value

	htmlElement.classList.add('show')
	htmlElement.textContent = cellValue

	if (cellValue === 'M') {
		// GAME OVER IS TRIGGERED

		const body = document.getElementById('matrix-container')
		const gameOverWrapper = document.getElementById('game-over')
		const text = document.getElementById('game-over-text')
		body?.classList.add('game-over')
		gameOverWrapper?.classList.add('lost')
		;(text as HTMLElement).textContent = 'You lost the game'

		// const counter = document.getElementById('timeCounter')
		// ;(counter as HTMLElement).textContent = '00:00'
		clearInterval(interval)

		return
	}

	// After here we are sure that the selected tile is not a mine but a number
	htmlElement.classList.add(colors[cellValue as keyof typeof colors])
	let safeSquares = document.getElementById('nonMineCounter')
	if (safeSquares)
		safeSquares.textContent = (+safeSquares.textContent - 1).toString()

	if (+(safeSquares as HTMLElement).textContent === 0) triggerWin()

	if (cellValue != 0) return // Do not continue if the cellValue is different than zero (it has mines in its surroundings)

	// This means that cellValue must be different than 0

	revealAdjacentCells(x, y, board)
}

export default handleDiscover
