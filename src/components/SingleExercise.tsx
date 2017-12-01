import * as React from 'react'
import * as Moment from 'moment'
import { connectToSpreadsheet } from "react-google-sheet-connector"

const xWidth = 250
const yHeight = 250
const barWidth = 20

const computeBarStyle = (color, width) => ({
	backgroundColor: color,
	width,
})

const getTitleColor = (color) => ({ color })

const getBarXPosition = (datum, dateRange, minDate, _x) => {
	const dx: number = ((Moment(datum.date) - Moment(minDate)) / dateRange) * _x
	return {
		transform: `translate(${dx}px, 0px)`,
	}
}

interface IExerciseRow {
	date: Date
	exercise: string
	reps: number
	weight: number
}

const minMaxWeight: number[] = (data) => data.reduce((acc: number, currentVal: IExerciseRow) => {
	const nextVal = []

	if (currentVal['weight (lbs)'] < acc[0]) {
		nextVal[0] = currentVal['weight (lbs)']

	} else {
		nextVal[0] = acc[0]
	}

	if (currentVal['weight (lbs)'] > acc[1]){
		nextVal[1] = currentVal['weight (lbs)']
	}else {
		nextVal[1] = acc[1]
	}
	return nextVal
}, [1000, 0])

const getBarHeight = (datum: IExerciseRow, data, _y) => {
	const [minWeight, maxWeight] = minMaxWeight(data)
	const dy = (datum['weight (lbs)'] - minWeight) / (maxWeight - minWeight) * _y
	return {
		height: dy,
	}
}

interface IProps {
	exerciseColor: string,
	data: {name: string, data: any}[]
}

const SingleExercise = (props: IProps) => {
	const { data, exerciseColor } = props
	const exerciseData = data[0]


	return (
		<div style={styles.container}>
			<p style={{ ...styles.title, ...getTitleColor(exerciseColor) }}>{exerciseData.name.toUpperCase()}</p>
			{JSON.stringify(exerciseData.data)}
			<div style={styles.barGraph}>
				{
					exerciseData.data.map(datum => (
						<div
							key={datum.date}
							style={{...computeBarStyle(exerciseColor, barWidth), ...getBarXPosition(datum, differenceInDates(exerciseData.data), exerciseData.data[0][0], xWidth), ...getBarHeight(datum, exerciseData.data, yHeight)}}
						/>
					))
				}
			</div>
		</div>
	)
}

const differenceInDates = (rows) => {
	const first = (Moment(rows[0][0]))
	const last = (Moment(rows[rows.length - 1][0]))
	return (last - first)
}

const styles = {
	title: {
		fontSize: 24,
	},
	button: {
		backgroundColor: 'transparent',
		borderRadius: 5,
		borderWidth: 2,
		padding: 3,
	},
	barGraph: {
		width: xWidth,
		height: yHeight,
		borderLeftStyle: 'solid',
		borderBottomStyle: 'solid',
		borderLeftWidth: 2,
		borderBottomWidth: 2,
		borderColor: 'black',
		alignSelf: 'center',
		display: 'flex',
		alignItems: 'flex-end',
	},
	container: {
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
}

export default connectToSpreadsheet(SingleExercise)
