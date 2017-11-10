import * as React from 'react'
import { GoogleTable } from "react-google-sheet-connector"

export default () => (
	<div>
		<p>Raw Data</p>
		<GoogleTable sheetName="PartA" />
	</div>
)
