import {
	getParametersFromLocalStorage,
	saveParametersToLocalStorage
} from '../utils/accessLocalStorage'
import { createGrid } from './createGrid'
import { handleClickingLogic } from './handleClickingLogic'
import { handleStopwatch, interval } from './handleStopwatch'
import renderMatrix from './renderMatrix'

const revealModal = () => {
	const modalContainer = document.getElementById('modal-container')
	const body = document.body
	if (!modalContainer) return

	modalContainer.classList.remove('out')
	modalContainer.classList.add('variant')
	body.classList.add('modal-active')

	// we have to set the values for the counters
	const data = getParametersFromLocalStorage()
	const size = document.getElementById('customSize')
	const density = document.getElementById('mineDensity')

	if (!size || !density) return

	size.textContent = data ? data.size.toString() : '10'
	density.textContent = data ? data.density.toString() : '0.1'
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
	const size = document.getElementById('customSize')
	const upSize = document.getElementById('moreSize')
	const downSize = document.getElementById('lessSize')

	if (!size || !upSize || !downSize) return

	upSize?.addEventListener('click', () => {
		if (+size.textContent === 20) return
		size.textContent = (+size.textContent + 1).toString()
	})

	downSize?.addEventListener('click', () => {
		if (+size.textContent === 10) return
		size.textContent = (+size.textContent - 1).toString()
	})
}

const handleDensityLogic = () => {
	const density = document.getElementById('mineDensity')
	const upDensity = document.getElementById('moreDensity')
	const downDensity = document.getElementById('lessDensity')

	if (!density || !upDensity || !downDensity) return

	upDensity?.addEventListener('click', () => {
		if (+density.textContent >= 0.5) return
		density.textContent = (+density.textContent + 0.1).toFixed(1).toString()
	})

	downDensity?.addEventListener('click', () => {
		if (+density.textContent <= 0.1) return
		density.textContent = (+density.textContent - 0.1).toFixed(1).toString()
	})
}

const handleResetGame = () => {
	const resetButton = document.getElementById('restart')
	resetButton?.addEventListener('click', () => {
		const size = document.getElementById('customSize')?.textContent
		const density = document.getElementById('mineDensity')?.textContent

		if (!size || !density) return

		const grid = createGrid(+size, +density)
		renderMatrix(grid)
		handleClickingLogic()
		clearInterval(interval)
		handleStopwatch()
		saveParametersToLocalStorage(+size, +density)
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
