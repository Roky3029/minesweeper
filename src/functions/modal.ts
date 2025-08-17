import {
	getParametersFromLocalStorage,
	saveParametersToLocalStorage
} from '../utils/accessLocalStorage'
import { generateBoard } from './generateBoard'
import { handleClickingLogic } from './handleClickingLogic'
import { handleStopwatch, interval } from './handleStopwatch'
import renderMatrix from './renderMatrix'

const handleUpwardsResizing = (
	downButton: HTMLElement,
	parameter: HTMLElement,
	upButton: HTMLElement,
	incrementalFactor: number,
	bound: number
) => {
	if (downButton.classList.contains('disabled'))
		downButton.classList.remove('disabled')

	if (!parameter.textContent) return
	const r = +parameter.textContent

	if (r >= bound) {
		return
	} else {
		parameter.textContent =
			incrementalFactor === 1
				? (r + incrementalFactor).toString()
				: (r + incrementalFactor).toFixed(1).toString()

		if (+parameter.textContent >= bound) upButton.classList.add('disabled')
	}
}

const handleDownwardsResizing = (
	upButton: HTMLElement,
	parameter: HTMLElement,
	downButton: HTMLElement,
	decrementalFactor: number,
	bound: number
) => {
	if (upButton.classList.contains('disabled'))
		upButton.classList.remove('disabled')

	if (!parameter.textContent) return

	const r = +parameter.textContent

	if (r <= bound) {
		return
	} else {
		parameter.textContent =
			decrementalFactor === 1
				? (r - decrementalFactor).toString()
				: (r - decrementalFactor).toFixed(1).toString()

		if (+parameter.textContent <= bound) downButton.classList.add('disabled')
	}
}

const revealModal = () => {
	const modalContainer = document.getElementById('modal-container')
	const body = document.body
	if (!modalContainer) return

	modalContainer.classList.remove('out')
	modalContainer.classList.add('variant')
	body.classList.add('modal-active')

	// we have to set the values for the counters
	const data = getParametersFromLocalStorage()
	const row = document.getElementById('row')
	const upRow = document.getElementById('moreRow')
	const downRow = document.getElementById('lessRow')

	const col = document.getElementById('col')
	const upCol = document.getElementById('moreCol')
	const downCol = document.getElementById('lessCol')
	const density = document.getElementById('mineDensity')

	const upDensity = document.getElementById('moreDensity')
	const downDensity = document.getElementById('lessDensity')

	if (
		!row ||
		!upRow ||
		!downRow ||
		!col ||
		!upCol ||
		!downCol ||
		!density ||
		!upDensity ||
		!downDensity
	)
		return

	row.textContent = data ? data.row.toString() : '10'
	col.textContent = data ? data.col.toString() : '10'
	density.textContent = data ? data.density.toString() : '0.1'

	if (+row.textContent <= 10) {
		downRow.classList.add('disabled')
	}
	if (+row.textContent >= 20) {
		upRow.classList.add('disabled')
	}

	if (+col.textContent <= 10) {
		downCol.classList.add('disabled')
	}
	if (+col.textContent >= 20) {
		upCol.classList.add('disabled')
	}

	if (+density.textContent <= 0.1) {
		downDensity.classList.add('disabled')
	}
	if (+density.textContent >= 0.5) {
		upDensity.classList.add('disabled')
	}
}

const hideModal = () => {
	const modalContainer = document.getElementById('modal-container')
	const body = document.body
	if (!modalContainer) return

	modalContainer.classList.add('out')
	body.classList.remove('modal-active')
	setTimeout(() => {
		modalContainer.removeAttribute('class')
	}, 100)
}

const handleSizeLogic = () => {
	const row = document.getElementById('row')
	const upRow = document.getElementById('moreRow')
	const downRow = document.getElementById('lessRow')

	const col = document.getElementById('col')
	const upCol = document.getElementById('moreCol')
	const downCol = document.getElementById('lessCol')

	if (!row || !upRow || !downRow || !col || !upCol || !downCol) return

	upRow?.addEventListener('click', () =>
		handleUpwardsResizing(downRow, row, upRow, 1, 20)
	)

	downRow?.addEventListener('click', () =>
		handleDownwardsResizing(upRow, row, downRow, 1, 10)
	)

	upCol?.addEventListener('click', () =>
		handleUpwardsResizing(downCol, col, upCol, 1, 20)
	)

	downCol?.addEventListener('click', () =>
		handleDownwardsResizing(upCol, col, downCol, 1, 10)
	)
}

const handleDensityLogic = () => {
	const density = document.getElementById('mineDensity')
	const upDensity = document.getElementById('moreDensity')
	const downDensity = document.getElementById('lessDensity')

	if (!density || !upDensity || !downDensity) return

	upDensity?.addEventListener('click', () =>
		handleUpwardsResizing(downDensity, density, upDensity, 0.1, 0.5)
	)

	downDensity?.addEventListener('click', () =>
		handleDownwardsResizing(upDensity, density, downDensity, 0.1, 0.1)
	)
}

const handleResetGame = () => {
	const resetButton = document.getElementById('restart')
	resetButton?.addEventListener('click', () => {
		const row = document.getElementById('row')?.textContent
		const col = document.getElementById('col')?.textContent
		const density = document.getElementById('mineDensity')?.textContent
		const body = document.getElementById('matrix-container')
		const text = document.getElementById('won-text')
		const wonWrapper = document.getElementById('won')
		const gameOverWrapper = document.getElementById('game-over')
		const textGameOver = document.getElementById('game-over-text')

		if (!row || !col || !density || !body || !text || !textGameOver) return

		if (body.classList.contains('won')) {
			body.classList.remove('won')
		}
		if (body.classList.contains('game-over')) {
			body.classList.remove('game-over')
		}

		wonWrapper?.classList.remove('victory')
		text.textContent = ''
		gameOverWrapper?.classList.remove('lost')
		textGameOver.textContent = ''

		const grid = generateBoard(+row, +col)
		renderMatrix(grid)
		handleClickingLogic(grid)
		clearInterval(interval)
		handleStopwatch()
		saveParametersToLocalStorage(+row, +col, +density)
		hideModal()
	})
}

export const handleModal = () => {
	const showHideModal = () => {
		const btn = document.getElementById('btn')
		const cross = document.getElementById('cross')

		btn?.addEventListener('click', () => {
			revealModal()
		})

		cross?.addEventListener('click', () => {
			hideModal()
		})
	}

	showHideModal()
	handleSizeLogic()
	handleDensityLogic()
	handleResetGame()
}
