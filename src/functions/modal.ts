import {
	getParametersFromLocalStorage,
	saveParametersToLocalStorage
} from '../utils/accessLocalStorage'
import { generateBoard } from './generateBoard'
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
	const row = document.getElementById('row')
	const col = document.getElementById('col')
	const density = document.getElementById('mineDensity')

	if (!row || !col || !density) return

	row.textContent = data ? data.row.toString() : '10'
	col.textContent = data ? data.col.toString() : '10'
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
	const row = document.getElementById('row')
	const upRow = document.getElementById('moreRow')
	const downRow = document.getElementById('lessRow')

	const col = document.getElementById('col')
	const upCol = document.getElementById('moreCol')
	const downCol = document.getElementById('lessCol')

	if (!row || !upRow || !downRow || !col || !upCol || !downCol) return

	if (+row.textContent === 10) {
		downRow.classList.add('disabled')
	} else if (+row.textContent === 20) {
		upRow.classList.add('disabled')
	}

	if (+col.textContent === 10) {
		downCol.classList.add('disabled')
	} else if (+col.textContent === 20) {
		upCol.classList.add('disabled')
	}

	upRow?.addEventListener('click', () => {
		if (downRow.classList.contains('disabled'))
			downRow.classList.remove('disabled')
		const r = +row.textContent

		if (r === 20) {
			return
		} else {
			row.textContent = (r + 1).toString()

			if (+row.textContent === 20) upRow.classList.add('disabled')
		}
	})

	downRow?.addEventListener('click', () => {
		if (upRow.classList.contains('disabled')) upRow.classList.remove('disabled')

		const r = +row.textContent

		if (r === 10) {
			return
		} else {
			row.textContent = (r - 1).toString()

			if (+row.textContent === 10) downRow.classList.add('disabled')
		}
	})

	upCol?.addEventListener('click', () => {
		if (downCol.classList.contains('disabled'))
			downCol.classList.remove('disabled')
		const c = +col.textContent

		if (c === 20) {
			return
		} else {
			col.textContent = (c + 1).toString()

			if (+col.textContent === 20) upCol.classList.add('disabled')
		}
	})

	downCol?.addEventListener('click', () => {
		if (upCol.classList.contains('disabled')) upCol.classList.remove('disabled')

		const c = +col.textContent

		if (c === 10) {
			return
		} else {
			col.textContent = (c - 1).toString()

			if (+col.textContent === 10) downCol.classList.add('disabled')
		}
	})
}

const handleDensityLogic = () => {
	const density = document.getElementById('mineDensity')
	const upDensity = document.getElementById('moreDensity')
	const downDensity = document.getElementById('lessDensity')

	if (!density || !upDensity || !downDensity) return

	if (+density.textContent >= 0.5) {
		upDensity.classList.add('disabled')
	} else if (+density.textContent <= 0.1) {
		downDensity.classList.add('disabled')
	}

	upDensity?.addEventListener('click', () => {
		if (downDensity.classList.contains('disabled'))
			downDensity.classList.remove('disabled')

		const d = +density.textContent

		if (d >= 0.5) {
			return
		} else {
			density.textContent = (d + 0.1).toFixed(1).toString()

			if (+density.textContent >= 0.5) upDensity.classList.add('disabled')
		}
	})

	downDensity?.addEventListener('click', () => {
		if (upDensity.classList.contains('disabled'))
			upDensity.classList.remove('disabled')

		const d = +density.textContent

		if (d <= 0.1) {
			return
		} else {
			density.textContent = (d - 0.1).toFixed(1).toString()

			if (+density.textContent <= 0.1) downDensity.classList.add('disabled')
		}
	})
}

const handleResetGame = () => {
	const resetButton = document.getElementById('restart')
	resetButton?.addEventListener('click', () => {
		const row = document.getElementById('row')?.textContent
		const col = document.getElementById('col')?.textContent
		const density = document.getElementById('mineDensity')?.textContent

		if (!row || !col || !density) return

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
