import flag from './../img/flag.png'
import { getMineCounter, setMineCounter } from './setMineCounter'

const handlePlaceFlag = (c: Element, e: Event) => {
	e.preventDefault()

	if (getMineCounter() === 0 && !c.classList.contains('flag')) return

	if (c.classList.contains('flag')) {
		c.classList.remove('flag')
		const image = c.childNodes[0]
		image.remove()
		setMineCounter(getMineCounter() + 1)
	} else {
		c.classList.add('flag')
		c.innerHTML = `<img src='${flag}' alt='Flag' width='20' height='20'/>`
		setMineCounter(getMineCounter() - 1)
	}
}

export default handlePlaceFlag
