import * as React from 'react'
import styled from 'styled-components'
import { connectToSpreadsheet } from "react-google-sheet-connector"
import { wordToRGBString } from '../utils'

interface IProps {
	swapExercise: any
	swapFeaturedColor: any
	getSheet: any
	filter: { exercise: string }
	data: any[]
}

const Button = styled.div`
	font-family: BodyFont;
	background-color: transparent;
	border-radius: 5px;
	padding: 0.25rem;
	margin-bottom: 0.5rem;
	border:2px solid ${props => props.color};
	color:${props => props.color};
	cursor: pointer;
	&:hover {
		background-color: ${props => props.color};
		color: black;
	}
`

const ExerciseMenu = (props: IProps) => {
	return (
		<div style={styles.container}>
			{
				props.data.map(exerciseItem => {
					const color = wordToRGBString(exerciseItem.name)
					return (
					<Button
						onClick={() => {
							props.swapExercise({ exercise: exerciseItem.name})
							props.swapFeaturedColor(color)
						}}
						key={exerciseItem.name}
						color={color}
					>
							{exerciseItem.name}
					</Button>
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
