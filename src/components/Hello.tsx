import * as React from 'react'
import { GOOGLE_SHEET_ID, GOOGLE_API_KEY } from '../../config'

import * as ReactGoogleSheetConnector from "react-google-sheet-connector"

import Comp from './Comp'

console.log('MOD',ReactGoogleSheetConnector)
export const Hello = () => <ReactGoogleSheetConnector
    apiKey={GOOGLE_API_KEY}
    spreadsheetId={GOOGLE_SHEET_ID}
    spinner={ <div className="loading-spinner"/> } >
    <div>
    	This content will be rendered once the data has been fetched from the spreadsheet.
	    <Comp/>
    </div>
</ReactGoogleSheetConnector>
