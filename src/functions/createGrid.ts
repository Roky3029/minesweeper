import { countAdjacentMines } from './countAdjacentMines'

const randomIntFromInterval = (min: number, max: number) => {
	// min and max included
	return Math.floor(Math.random() * (max - min + 1) + min)
}

export const createGrid = (size: number) => {
	const numberOfMines = Math.ceil(0.3 * size * size)

	// Creating the field with the specified length
	let field: (undefined | string | number)[][] = []
	for (let i = 0; i < size; i++) {
		field.push([])
		for (let j = 0; j < size; j++) {
			field[i].push(undefined)
		}
	}

	for (let i = 0; i < numberOfMines; i++) {
		let row = randomIntFromInterval(0, size - 1)
		let col = randomIntFromInterval(0, size - 1)

		while (field[row][col] === 'M') {
			row = randomIntFromInterval(0, size - 1)
			col = randomIntFromInterval(0, size - 1)
		}

		field[row][col] = 'M'
	}

	return countAdjacentMines(field)
}
