import * as React from 'react'
import { GoogleTable } from "react-google-sheet-connector"

export default () => (
	<div style={{color: 'white'}}>
		<p>Raw Data</p>
		<GoogleTable sheetName="PartA" />
	</div>
)
