const tintFactor = 0.25

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

const tint = (currentColorVal) => (currentColorVal + ((255 - currentColorVal) * tintFactor))

const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

const wordToColor = (word: string, rgb: RGB, darken?: boolean): number => {
	let instances = 0
	word.split('').forEach(letter => {
		if (alphabet.indexOf(letter) >= RGBToLetter[RGB[rgb]].min &&
			alphabet.indexOf(letter) <= RGBToLetter[RGB[rgb]].max
		 ) {
			instances++
			}
		},
	)

	if (instances === 0) return 0
	const calculatedVal = (instances / word.length) * 255
	return darken ? Math.floor(calculatedVal) : Math.floor(tint(calculatedVal))
}

export const wordToRGBString = (word: string): string => {
	return `rgb(${wordToColor(word, RGB.r)},${wordToColor(word, RGB.g)},${wordToColor(word, RGB.b)})`
}

export const wordToRGBStringDarkened = (word: string): string => {
	return `rgb(${wordToColor(word, RGB.r, true)},${wordToColor(word, RGB.g, true)},${wordToColor(word, RGB.b, true)})`
}

const brzyckiFormulaCoefficients = [0, 1, 1.029, 1.059, 1.091, 1.125,
1.161, 1.200, 1.242, 1.286, 1.330]

// The Brzycki Formula
export const calculate1RM = (reps: number, weight: number) => {
	const coeff = brzyckiFormulaCoefficients[reps]
	if (!coeff) {
		console.error(`Formula has not been set up to handle ${reps} reps`)
		return weight
	} else {
		return Math.floor(coeff * weight)
	}
}
