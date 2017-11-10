enum RGB {
	r = 0,
	g = 1,
	b = 2,
}

const RGBToLetter = {
	r: {
		min: 0,
		max: 7,
	},
	g: {
		min: 8,
		max: 16,
	},
	b: {
		min: 17,
		max: 25,
	},
}

const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

const wordToColor = (word: string, rgb: RGB, darken?: boolean): number => {
	let instances = 0
	word.split('').forEach(letter => {
		if (alphabet.indexOf(letter) >= RGBToLetter[rgb].min &&
			alphabet.indexOf(letter) <= RGBToLetter[rgb].max
		 ) {
			instances++
			}
		})
	if (instances === 0) return 0
	return Math.floor((instances / word.length) * 255) + (darken ? 40 : 0)

	)
}

export const wordToRGBString = (word: string): string => {
	return `rgb(${wordToColor(word, 'r')},${wordToColor(word, 'g')},${wordToColor(word, 'b')})`
}

export const wordToRGBStringDarkened = (word: string): string => {
	return `rgb(${wordToColor(word, 'r', true)},${wordToColor(word, 'g', true)},${wordToColor(word, 'b', true)})`
}


