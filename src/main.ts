import './style.css'
import { createGrid } from './functions/createGrid.ts'
import renderMatrix from './functions/renderMatrix.ts'
import { handleReset } from './functions/handleReset.ts'
import { handleModal } from './functions/modal.ts'

// CSS files
import './styles/gameOver.css'
import './styles/gameStatus.css'
import './styles/matrix.css'
import './styles/modal.css'
import './styles/win.css'
import './styles/colors.css'
import { handleClickingLogic } from './functions/handleClickingLogic.ts'
import { getParametersFromLocalStorage } from './utils/accessLocalStorage.ts'

const data = getParametersFromLocalStorage()
const grid = data ? createGrid(data.size, data.density) : createGrid(10, 0.1)

renderMatrix(grid)
handleClickingLogic()
handleReset()
handleModal()
