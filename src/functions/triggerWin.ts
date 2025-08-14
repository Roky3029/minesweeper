import { interval } from './handleStopwatch'

export const triggerWin = () => {
	const body = document.getElementById('matrix-container')
	const wonWrapper = document.getElementById('won')
	const text = document.getElementById('won-text')
	const totalTime = document.getElementById('timeCounter')
	const [min, sec] = (totalTime as HTMLElement)?.textContent.split(':')

	body?.classList.add('won')
	wonWrapper?.classList.add('victory')
	;(
		text as HTMLElement
	).textContent = `CONGRATULATIONS. You've beaten the game in ${min}m and ${sec}s`

	clearInterval(interval)
	return
}
