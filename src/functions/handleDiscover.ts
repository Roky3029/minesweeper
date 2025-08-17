import { bombSVG, colors } from '../utils/constants'
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
	const cellValue = htmlElement.dataset.value

	htmlElement.classList.add('show')
	if (+cellValue === 0) {
		htmlElement.textContent = ''
	} else {
		htmlElement.textContent = cellValue
	}

	if (cellValue === 'M') {
		// GAME OVER IS TRIGGERED

		const body = document.getElementById('matrix-container')
		const gameOverWrapper = document.getElementById('game-over')
		const text = document.getElementById('game-over-text')
		body?.classList.add('game-over')
		gameOverWrapper?.classList.add('lost')
		;(text as HTMLElement).textContent = 'You lost the game'
		htmlElement.textContent = ''
		htmlElement.innerHTML = bombSVG
		clearInterval(interval)
		return
	}

	// After here we are sure that the selected tile is not a mine but a number
	htmlElement.classList.add(colors[cellValue as keyof typeof colors])
	let safeSquares = document.getElementById('nonMineCounter')

	if (!safeSquares?.textContent) return

	safeSquares.textContent = (+safeSquares.textContent - 1).toString()

	if (+(safeSquares as HTMLElement).textContent === 0) triggerWin()

	if (cellValue != 0) return // Do not continue if the cellValue is different than zero (it has mines in its surroundings)

	// This means that cellValue must be different than 0
	revealAdjacentCells(x, y, board)
}

export default handleDiscover
