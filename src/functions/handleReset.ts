// import { createGrid } from './createGrid'
// import renderMatrix from './renderMatrix'

export const handleReset = () => {
	const resetButton = document.getElementById('reset-button')

	resetButton?.addEventListener('click', () => {
		// const body = document.getElementById('matrix-container')
		// const gameOverWrapper = document.getElementById('game-over')
		// const text = document.getElementById('game-over-text')
		// body?.classList.remove('game-over')
		// gameOverWrapper?.classList.remove('lost')
		// ;(text as HTMLElement).textContent = ''

		// body?.childNodes.forEach(child => child.remove())

		// const grid = createGrid(10)
		// renderMatrix(grid)

		window.location.reload()
	})
}
