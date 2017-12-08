import * as React from 'react'
import * as Moment from 'moment'
import { connectToSpreadsheet } from "react-google-sheet-connector"
import styled from 'styled-components'

const X_AXIS = 450
const Y_AXIS = 250

const BarGraph = styled.div`
	width: ${X_AXIS}px;
	height: ${Y_AXIS}px;
	border-left: white 2px solid;
	border-bottom: white 2px solid;
	align-self: center;
	display: flex;
	align-items: flex-end;
	position: relative;
	padding-right: ${props => (props.smallestDx / props.dateRange * X_AXIS)}px
`

const Title = styled.p`
	font-size: 24px;
	font-family: BaseFont;
	color: ${props => props.color};
`

const Label = styled.text`
	font-size: 8px;
	text-align: center;
	color: white;
`
const Bar = styled.div`
	display: inline-block;
	position: absolute;
	background-color: ${props => props.exerciseColor};
	height: ${props => getBarHeight(props.datum, props.rows, props.yAxis)}px;
`

const BarGraphContainer = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
`
const MarkerContainer = styled.div`
	width: ${X_AXIS}px;
	position: relative;
`

const Marker = styled.text`
	color: white;
	fontsize: 12;
	display: inline-block;
	position: absolute;
`
const getBarXPosition = (datum, dateRange, minDate, _x, smallestDx, idx, rotate?) => {
	const dx: number = ((Moment(datum.date) - Moment(minDate)) / dateRange) * _x
	const width: number = (smallestDx / dateRange) * _x *.75
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

	return dy
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
		<BarGraphContainer>
			<Title color={exerciseColor}>{exerciseData.name}</Title>
			<p style={{ padding: 0, margin: 0, color: 'white'}}>{JSON.stringify(exerciseData.data)}</p>
			<BarGraph smallestDx={smallestDx} dateRange={dateRange}>
				{
					exerciseData.data.map((datum, idx) => (
						<Bar
							key={`${datum.date}${datum.reps}`}
							exerciseColor={exerciseColor}
							datum={datum}
							rows={exerciseData.data}
							yAxis={Y_AXIS}
							dateRange={dateRange}
							smallestDx={smallestDx}
							style={{...getBarXPosition(datum, dateRange, exerciseData.data[0][0], X_AXIS, smallestDx, idx)}}
						>
						<Label>{datum['weight (lbs)']}</Label>
						</Bar>
					))
				}
			</BarGraph>
			<MarkerContainer>
				{
					monthMarkers(exerciseData.data, dateRange, smallestDx)
				}
			</MarkerContainer>
		</BarGraphContainer>
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
		markers.push(
			<Marker
				key={`${markerPoint}`}
				style={getBarXPosition({ date: markerPoint }, dateRange, rows[0][0], X_AXIS, smallestDx, idx)}>
				{Moment(markerPoint).format('MMM')}
			</Marker>
		)
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

		if (diff < acc) {
			return diff
		} else {
			return acc
		}
	},
	Infinity,
)

export default connectToSpreadsheet(SingleExercise)
