import { calcMines } from '../utils/calcMines'
import { directions } from '../utils/constants'

export const generateBoard = (rows: number, cols: number) => {
	const field = Array.from({ length: rows }, () => Array(cols).fill(undefined))
	return field
}

export const placeMines = (
	board: any[][],
	density: number,
	clickedRow: number,
	clickedCol: number
) => {
	let rows = board.length
	let cols = board[0].length
	const totalMines = calcMines(rows, cols, density)

	// Crear lista de posiciones posibles
	let positions = []
	for (let f = 0; f < rows; f++) {
		for (let c = 0; c < cols; c++) {
			// Excluir primera casilla y vecinos
			if (Math.abs(f - clickedRow) <= 1 && Math.abs(c - clickedCol) <= 1)
				continue
			positions.push([f, c])
		}
	}

	// Barajar y elegir minas
	positions.sort(() => Math.random() - 0.5)
	for (let i = 0; i < totalMines; i++) {
		let [f, c] = positions[i]
		board[f][c] = 'M'
	}

	// Calcular números
	calcNumbers(board)
}

export const calcNumbers = (board: any[][]) => {
	for (let f = 0; f < board.length; f++) {
		for (let c = 0; c < board[0].length; c++) {
			if (board[f][c] === 'M') continue
			let count = 0
			for (let [df, dc] of directions) {
				let nf = f + df,
					nc = c + dc
				if (nf >= 0 && nf < board.length && nc >= 0 && nc < board[0].length) {
					if (board[nf][nc] === 'M') count++
				}
			}
			board[f][c] = count
		}
	}
}
