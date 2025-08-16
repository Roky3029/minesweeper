import handleDiscover from '../functions/handleDiscover'
import { directions } from './constants'

export const revealAdjacentCells = (
	x: number,
	y: number,
	board: (string | number)[][]
) => {
	for (const [dx, dy] of directions) {
		const nx = x + dx
		const ny = y + dy

		if (nx >= 0 && nx < board.length && ny >= 0 && ny < board[0].length) {
			const nextElement = document.getElementById(`${nx}-${ny}`)
			if (nextElement && !nextElement.classList.contains('show')) {
				handleDiscover(board, nx, ny, nextElement)
			}
		}
	}
}
