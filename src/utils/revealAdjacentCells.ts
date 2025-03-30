import handleDiscover from '../functions/handleDiscover'

export const revealAdjacentCells = (
	x: number,
	y: number,
	board: (string | number)[][]
) => {
	const directions = [
		[-1, -1],
		[-1, 0],
		[-1, 1],
		[0, -1],
		[0, 1],
		[1, -1],
		[1, 0],
		[1, 1]
	]

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
