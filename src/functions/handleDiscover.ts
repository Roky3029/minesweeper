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
		1: 'one',
		2: 'two',
		3: 'three',
		4: 'four',
		5: 'five',
		6: 'six',
		7: 'seven',
		8: 'eight'
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
		htmlElement.innerHTML =
			'<svg fill="#000000" width="40px" height="40px" viewBox="0 0 14 14" role="img" focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="m 11.324219,3.07539 -1.21875,1.21875 0.621093,0.6211 c 0.220313,0.22031 0.220313,0.57656 0,0.79453 L 10.31875,6.11758 C 10.595313,6.7293 10.75,7.40899 10.75,8.12383 c 0,2.69297 -2.1820313,4.875 -4.875,4.875 C 3.1820313,12.99883 1,10.81914 1,8.12617 c 0,-2.69296 2.1820312,-4.875 4.875,-4.875 0.7148437,0 1.3945312,0.15469 2.00625,0.43125 L 8.2890625,3.27461 C 8.509375,3.0543 8.865625,3.0543 9.0835937,3.27461 L 9.7046875,3.8957 10.923438,2.67695 11.324219,3.07539 Z m 1.394531,-0.66797 -0.5625,0 c -0.154688,0 -0.28125,0.12657 -0.28125,0.28125 0,0.15469 0.126562,0.28125 0.28125,0.28125 l 0.5625,0 C 12.873438,2.96992 13,2.84336 13,2.68867 13,2.53399 12.873438,2.40742 12.71875,2.40742 Z M 11.3125,1.00117 c -0.154688,0 -0.28125,0.12657 -0.28125,0.28125 l 0,0.5625 c 0,0.15469 0.126562,0.28125 0.28125,0.28125 0.154688,0 0.28125,-0.12656 0.28125,-0.28125 l 0,-0.5625 c 0,-0.15468 -0.126562,-0.28125 -0.28125,-0.28125 z m 0.794531,1.28907 0.398438,-0.39844 c 0.110156,-0.11016 0.110156,-0.28828 0,-0.39844 -0.110157,-0.11016 -0.288281,-0.11016 -0.398438,0 L 11.708594,1.8918 c -0.110157,0.11015 -0.110157,0.28828 0,0.39844 0.1125,0.11015 0.290625,0.11015 0.398437,0 z m -1.589062,0 c 0.110156,0.11015 0.288281,0.11015 0.398437,0 0.110156,-0.11016 0.110156,-0.28829 0,-0.39844 L 10.517969,1.49336 c -0.110156,-0.11016 -0.288281,-0.11016 -0.398438,0 -0.110156,0.11016 -0.110156,0.28828 0,0.39844 l 0.398438,0.39844 z m 1.589062,0.79687 c -0.110156,-0.11016 -0.288281,-0.11016 -0.398437,0 -0.110157,0.11016 -0.110157,0.28828 0,0.39844 l 0.398437,0.39844 c 0.110157,0.11015 0.288281,0.11015 0.398438,0 0.110156,-0.11016 0.110156,-0.28829 0,-0.39844 L 12.107031,3.08711 Z M 3.625,7.37617 c 0,-0.82734 0.6726562,-1.5 1.5,-1.5 0.20625,0 0.375,-0.16875 0.375,-0.375 0,-0.20625 -0.16875,-0.375 -0.375,-0.375 -1.2398438,0 -2.25,1.01016 -2.25,2.25 0,0.20625 0.16875,0.375 0.375,0.375 0.20625,0 0.375,-0.16875 0.375,-0.375 z"/></svg>'

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
