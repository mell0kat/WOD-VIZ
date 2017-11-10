import * as React from 'react'
import { connectToSpreadsheet } from "react-google-sheet-connector"

const MyComponent = (props) => {
    console.log('POPS', props)
    return (
        <div>
            {
                props.getSheet("PartA")
                    .map((row, i) =>
                        JSON.stringify(row)
                    )
            }
        </div>
    )
}

export default connectToSpreadsheet(MyComponent)
