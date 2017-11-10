import * as React from 'react'
import { GOOGLE_SHEET_ID, GOOGLE_API_KEY } from '../../config'

import * as ReactGoogleSheetConnector from "react-google-sheet-connector"
import { GoogleSheet } from "react-google-sheet-connector"

import Comp from './Comp'
import RawData from './RawData'
// <GoogleSheet child={Comp} sheetName="PartA" filter={{ exercise: 'deadlift'}} group="Exercise" sort="Column to Sort">

interface IState {
	filter: undefined | { exercise: string }
}

console.log('MOD',ReactGoogleSheetConnector)
export class Hello extends React.Component<any, IState> {
	constructor() {
		super()
		this.state = {
			filter: undefined
		}
		this.swapExercise = this.swapExercise.bind(this)
	}
	swapExercise(exercise) {
		this.setState({
			filter: exercise
		})
		console.log('this.state', this.state)
	}

	render() {
		return (
			<ReactGoogleSheetConnector
		    apiKey={GOOGLE_API_KEY}
		    spreadsheetId={GOOGLE_SHEET_ID}
		    spinner={ <div className="loading-spinner"/> } >
		    <div>
		    	This content will be rendered once the data has been fetched from the spreadsheet.
				<GoogleSheet child={Comp} sheetName="PartA" filter={this.state.filter} swapExercise={this.swapExercise} group="Exercise" sort="Column to Sort">
					<Comp/>
					</GoogleSheet>
			    <RawData/>
		    </div>
		</ReactGoogleSheetConnector>
	)
		}


}


