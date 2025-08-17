export const setMineCounter = (value: number) => {
	const mineCounter = document.getElementById('mineCounter')

	;(mineCounter as HTMLElement).textContent = value.toString()
}

export const getMineCounter = () => {
	const mineCounter = document.getElementById('mineCounter')

	if (!mineCounter) return -1

	return +mineCounter.textContent
}
