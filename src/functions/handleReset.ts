export const handleReset = () => {
	const resetButton = document.querySelectorAll('.reset-button')

	resetButton?.forEach(btn => {
		btn.addEventListener('click', () => window.location.reload())
	})
}
