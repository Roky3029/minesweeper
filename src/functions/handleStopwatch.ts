let interval: number

const handleStopwatch = () => {
	const counter = document.getElementById('timeCounter')
	;(counter as HTMLElement).textContent = '00:00'
	let minutes = 0
	let seconds = 0
	interval = setInterval(() => {
		seconds += 1

		if (seconds === 60) {
			seconds = 0
			minutes += 1
		}

		;(counter as HTMLElement).textContent = `${
			minutes <= 9 ? `0${minutes}` : minutes
		}:${seconds <= 9 ? `0${seconds}` : seconds}`
	}, 1000)
}

export { interval, handleStopwatch }
