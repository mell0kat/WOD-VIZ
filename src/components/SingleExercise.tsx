import * as React from 'react'
import * as Moment from 'moment'
import { connectToSpreadsheet } from "react-google-sheet-connector"

const xWidth = 450
const yHeight = 250

const computeBarStyle = (color) => ({
	backgroundColor: color,
})

const getTitleColor = (color) => ({ color })

const getBarXPosition = (datum, dateRange, minDate, _x, smallestDx, idx, rotate?) => {
	const dx: number = ((Moment(datum.date) - Moment(minDate)) / dateRange) * _x
	const width: number = (smallestDx / dateRange) * _x *.75
	console.log('width', width)
	return {
		left: dx,
		transform: `${(rotate ? 'rotate(90deg)' : '')}`,
		width: !rotate && width ,
	}
}

interface IExerciseRow {
	date: Date
	exercise: string
	reps: number
	weight: number
}

const minMaxWeight: number[] = (data) => data.reduce((acc: number, currentVal: IExerciseRow) => {

	const nextVal = [] // 93, 95.5  105.5
	const thisVal = currentVal['weight (lbs)']
	const currentMin = +(acc[0])
	const currentMax = +(acc[1])

	if (thisVal < currentMin) {
		nextVal[0] = thisVal

	} else {
		nextVal[0] = currentMin
	}

	if (thisVal > currentMax) {
		nextVal[1] = thisVal
	}else {
		nextVal[1] = currentMax
	}
	return nextVal
}, [1000, 0])

const getBarHeight = (datum: IExerciseRow, data, _y) => {
	const [minWeight, maxWeight] = minMaxWeight(data)

	const range = maxWeight - minWeight
	const padding = 1.5 * range

	const dy = ((datum['weight (lbs)'] - minWeight + (0.5 * padding)) / (maxWeight - minWeight + padding)) * _y

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

	const dateRange = differenceInDates(exerciseData.data)
	const smallestDx = smallestDiff(exerciseData.data)
	console.log('smallestDx', exerciseData.data)
	return (
		<div style={styles.container}>
			<p style={{ ...styles.title, ...getTitleColor(exerciseColor) }}>{exerciseData.name}</p>
			<p style={{ padding: 0, margin: 0, color: 'white'}}>{JSON.stringify(exerciseData.data)}</p>
			<div style={{...styles.barGraph, paddingRight: (smallestDx / dateRange * xWidth)}}>
				{
					exerciseData.data.map((datum, idx) => (
						<div
							key={`${datum.date}${datum.reps}`}
							style={{...styles.bar, ...computeBarStyle(exerciseColor), ...getBarXPosition(datum, dateRange, exerciseData.data[0][0], xWidth, smallestDx, idx), ...getBarHeight(datum, exerciseData.data, yHeight)}}
						>
						<p style={styles.label}>{datum['weight (lbs)']}</p>
						</div>
					))
				}
			</div>
			<div style={{width: xWidth, position:'relative'}}>
				{
					monthMarkers(exerciseData.data, dateRange, smallestDx)
				}
			</div>
		</div>
	)
}

const differenceInDates = (rows: IExerciseRow[]) => {
	console.log('Start moonth', Moment(rows[0].date).startOf('month'))
	const first = (Moment(rows[0].date))
	const last = (Moment(rows[rows.length - 1].date))
	return (last - first)
}

const monthMarkers = (rows: IExerciseRow[], dateRange, smallestDx) => {

	const markers = []
	Moment(rows[0].date).startOf('month'))
	let markerPoint = Moment(rows[0].date).startOf('month')
	let idx = 0
	while (markerPoint < Moment(rows[rows.length - 1].date)) {
		markers.push(<text
			key={`${markerPoint}`}
			style={{...getBarXPosition({ date: markerPoint }, dateRange, rows[0][0], xWidth, smallestDx, idx), color: 'white', fontSize: 12, display: 'inline-block', position: 'absolute'}}>{Moment(markerPoint).format('MMM')}
			</text>)
		markerPoint = markerPoint.add(1, 'month')
		idx++
	}
	return markers
}

const smallestDiff = (rows: IExerciseRow[]) => rows.reduce(
	(acc, currentVal, currentIdx, array) => {

		const nextRow = array[currentIdx + 1]
		if (!nextRow) { return acc }
		const diff = Math.abs(Moment(nextRow.date) - Moment(currentVal.date))
	console.log('diff', diff, nextRow.date, currentVal.date)
		if (diff < acc) {
			return diff
		} else {
			return acc
		}
	},
	Infinity,
)

const styles = {
	title: {
		fontSize: 24,
		fontFamily: 'BaseFont'
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
		borderColor: 'white',
		alignSelf: 'center',
		//paddingLeft: .5 * barWidth,
		// paddingRight: .5 * barWidth,
		display: 'flex',
		alignItems: 'flex-end',
		position: 'relative',
	},
	bar: {
		display: 'inline-block',
		position: 'absolute',
	},
	label: {
		fontSize: 8,
		textAlign: 'center',
		color: 'white',
	},
	container: {
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
}

export default connectToSpreadsheet(SingleExercise)
