// $('.button').click(function () {
// 	var buttonId = $(this).attr('id')
// 	$('#modal-container').removeAttr('class').addClass(buttonId)
// 	$('body').addClass('modal-active')
// })

import { createGrid } from './createGrid'
import renderMatrix from './renderMatrix'

// $('#modal-container').click(function () {
// 	$(this).addClass('out')
// 	$('body').removeClass('modal-active')
// })

// export const revealModal = () => {
// 	const modalContainer = document.getElementById('modal-container')
// 	const body = document.querySelector('body')
// 	modalContainer?.removeAttribute('class')
// 	modalContainer?.classList.add('two')
// 	body?.classList.add('modal-active')
// }

const revealModal = () => {
	const modalContainer = document.getElementById('modal-container')
	const body = document.body
	if (!modalContainer) return

	modalContainer.classList.remove('out')
	modalContainer.classList.add('two')
	body.classList.add('modal-active')
}

const hideModal = () => {
	const modalContainer = document.getElementById('modal-container')
	const body = document.body
	if (!modalContainer) return

	modalContainer.addEventListener('click', () => {
		modalContainer.classList.add('out')
		body.classList.remove('modal-active')
	})
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
		if (+density.textContent >= 0.9) return
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
		hideModal()
	})
}

export const handleModal = () => {
	const openModal = () => {
		const btn = document.getElementById('btn')
		btn?.addEventListener('click', () => {
			revealModal()
		})
	}

	openModal()
	handleSizeLogic()
	handleDensityLogic()
	handleResetGame()
}
