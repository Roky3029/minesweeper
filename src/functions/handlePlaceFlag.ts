import flag from './../img/flag.png'

const handlePlaceFlag = (c: Element, e: Event) => {
	e.preventDefault()

	if (c.classList.contains('flag')) {
		c.classList.remove('flag')
		const image = c.childNodes[0]
		image.remove()
	} else {
		c.classList.add('flag')
		c.innerHTML = `<img src='${flag}' alt='Flag' width='20' height='20'/>`
	}
}

export default handlePlaceFlag
