type Parameters = {
	row: number
	col: number
	density: number
}

export const saveParametersToLocalStorage = (
	row: number,
	col: number,
	density: number
) => {
	const data: Parameters = { row, col, density }

	localStorage.setItem('parameters', JSON.stringify(data))
}

export const getParametersFromLocalStorage = () => {
	const data = localStorage.getItem('parameters')
	if (!data) return
	return JSON.parse(data) as Parameters
}
