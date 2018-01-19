import * as React from 'react'
import { GOOGLE_SHEET_ID, GOOGLE_API_KEY } from '../../config'
import * as ReactGoogleSheetConnector from "react-google-sheet-connector"
import { GoogleSheet } from "react-google-sheet-connector"
import ExerciseMenu from './ExerciseMenu'
import SingleExercise from './SingleExercise'
import RawData from './RawData'


interface IState {
	filter: undefined | { exercise: string }
	exerciseColor: string
}

export class Main extends React.Component<any, IState> {
	constructor() {
		super()
		this.state = {
			filter: undefined,
			exerciseColor: '',
		}
		this.swapExercise = this.swapExercise.bind(this)
		this.swapFeaturedColor = this.swapFeaturedColor.bind(this)
	}
	swapExercise(exercise) {
		this.setState({
			filter: {...exercise},
		})


	}
	swapFeaturedColor(color) {
		this.setState({
			exerciseColor: color
		})
	}

	render() {
		return (
			<ReactGoogleSheetConnector
				apiKey={GOOGLE_API_KEY}
				spreadsheetId={GOOGLE_SHEET_ID}
				spinner={ <div className="loading-spinner"/> } >
				<div>
					<div style={{ flexDirection: 'row', display: 'flex'}}>
					<GoogleSheet
						child={ExerciseMenu}
						sheetName="PartA"
						group="Exercise"
						swapExercise={this.swapExercise}
						swapFeaturedColor={this.swapFeaturedColor}
					/>
					{this.state.filter &&
						<GoogleSheet
							child={SingleExercise}
							sheetName="PartA"
							group="Exercise"
							sort="Date"
							filter={this.state.filter}
							swapExercise={this.swapExercise}
							exerciseColor={this.state.exerciseColor}
						/>
					}
				</div>
				{/* <RawData/> */}
			</div>
		</ReactGoogleSheetConnector>
		)
	}
}
