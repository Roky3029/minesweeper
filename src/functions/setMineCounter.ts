export const setMineCounter = (value: number) => {
	const mineCounter = document.getElementById('mineCounter')

	;(mineCounter as HTMLElement).textContent = value.toString()
}

export const getMineCounter = () => {
	const mineCounter = document.getElementById('mineCounter')

	return +(mineCounter as HTMLElement).textContent
}
