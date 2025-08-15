export const calcMines = (size: number, density: number) => {
	return Math.ceil(density * size * size)
}
