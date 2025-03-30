const countMines = (
	row: number,
	col: number,
	field: (undefined | string | number)[][]
): number => {
	let counter = 0
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

	for (let i = 0; i < directions.length; i++) {
		const newRow = row + directions[i][0]
		const newCol = col + directions[i][1]

		// Check if the matrix bounds are trespassed
		if (
			// Bound is not exceeded on the left hand side
			newRow >= 0 &&
			// Bound is not exceeded on the right hand side
			newRow < field.length &&
			// Bound is not exceeded on the upper side
			newCol >= 0 &&
			// Bound is not exceeded on the lower side
			newCol < field[0].length
		) {
			if (field[newRow][newCol] === 'M') counter++
		}
	}

	return counter
}

export const countAdjacentMines = (
	field: (undefined | string | number)[][]
) => {
	/* PRECONDITION: field is a square matrix */
	for (let i = 0; i < field.length; i++) {
		for (let j = 0; j < field.length; j++) {
			if (field[i][j] !== 'M') {
				const numberOfAdjacentMines = countMines(i, j, field)
				field[i][j] = numberOfAdjacentMines
			}
		}
	}

	return field
}
