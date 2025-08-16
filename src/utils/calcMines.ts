export const calcMines = (rows: number, cols: number, density: number) => {
	return Math.ceil(density * rows * cols)
}
