type Parameters = {
	size: number
	density: number
}

export const saveParametersToLocalStorage = (size: number, density: number) => {
	const data: Parameters = { size, density }

	localStorage.setItem('parameters', JSON.stringify(data))
}

export const getParametersFromLocalStorage = () => {
	const data = localStorage.getItem('parameters')
	if (!data) return
	return JSON.parse(data) as Parameters
}
