// TypeScript files
// import { createGrid } from './functions/createGrid.ts'
import renderMatrix from './functions/renderMatrix.ts'
import { handleReset } from './functions/handleReset.ts'
import { handleModal } from './functions/modal.ts'
import { handleClickingLogic } from './functions/handleClickingLogic.ts'
import { getParametersFromLocalStorage } from './utils/accessLocalStorage.ts'
import { generateBoard } from './functions/generateBoard.ts'
import { setMineCounter } from './functions/setMineCounter.ts'
import { calcMines } from './utils/calcMines.ts'

// CSS files
import './style.css'
import './styles/gameOver.css'
import './styles/gameStatus.css'
import './styles/matrix.css'
import './styles/modal.css'
import './styles/win.css'
import './styles/colors.css'
import './styles/footer.css'

const data = getParametersFromLocalStorage()
const grid = data ? generateBoard(data.row, data.col) : generateBoard(10, 10)
const totalMines = data
	? calcMines(data?.row, data?.col, data?.density)
	: calcMines(10, 10, 0.1)
setMineCounter(totalMines)

renderMatrix(grid)
handleClickingLogic(grid)
handleReset()
handleModal()
