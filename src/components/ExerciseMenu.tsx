import * as React from 'react'
import { connectToSpreadsheet } from "react-google-sheet-connector"
import { wordToRGBString } from '../utils'

interface IProps {
	swapExercise: any
	swapFeaturedColor: any
	getSheet: any
	filter: { exercise: string }
	data: any[]
}

const ExerciseMenu = (props: IProps) => {
	return (
		<div style={styles.container}>
			{
				props.data.map(exerciseItem => {
					const color = wordToRGBString(exerciseItem.name)
					return (
					<button
						onClick={() => {
							props.swapExercise({ exercise: exerciseItem.name})
							props.swapFeaturedColor(color)
						}}
						key={exerciseItem.name}
						style={{...styles.button, borderColor: color, color: color}}>
						{exerciseItem.name}
					</button>
					)
				})
			}
		</div>
	)
}

const styles = {
	button: {
		backgroundColor: 'transparent',
		borderRadius: 5,
		borderWidth: 2,
		padding: 3,
		marginBottom: 3,
	},
	container: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-start',
	},
}

export default connectToSpreadsheet(ExerciseMenu)
