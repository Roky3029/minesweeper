import { revealAdjacentCells } from '../utils/revealAdjacentCells'

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
		const body = document.getElementById('matrix-container')
		const gameOverWrapper = document.getElementById('game-over')
		const text = document.getElementById('game-over-text')
		body?.classList.add('game-over')
		gameOverWrapper?.classList.add('lost')
		;(text as HTMLElement).textContent = 'You lost the game'
	}

	htmlElement.classList.add(colors[cellValue as keyof typeof colors])

	if (cellValue != 0) {
		return // No continuar si no es una celda vacía inicial
	}

	if (cellValue == 0) {
		revealAdjacentCells(x, y, board)
	}
}

export default handleDiscover
