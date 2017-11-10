import * as React from 'react'
import { connectToSpreadsheet } from "react-google-sheet-connector"
import { wordToRGBString, wordToRGBStringDarkened } from '../utils'

const MyComponent = (props) => {
	const sheetData = props.getSheet("PartA")
	console.log('sheetData', sheetData)
	console.log('PROPS', props.data, props.filter)
	return (
		<div>
			{
				!props.filter &&
				 props.data.map(exerciseItem => (
					<button
						onClick={() => { props.swapExercise({ exercise: exerciseItem.name})}}
						key={exerciseItem.name}
						style={{...styles.button, backgroundColor: wordToRGBString(exerciseItem.name), borderColor: wordToRGBStringDarkened(exerciseItem.name)}}>
						{exerciseItem.name}
					</button>
					),
				)


			}
			<p>Ready to display {props.filter}</p>
		</div>
	)
}
console.log('RGB', wordToRGBString('deadlift'))


const styles = {
	button: {

		borderRadius: 5,
		borderWidth: 4,
	}
}

export default connectToSpreadsheet(MyComponent)
