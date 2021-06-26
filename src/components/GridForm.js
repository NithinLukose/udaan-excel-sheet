import React from 'react'

function GridForm(props) {
    return (
        <div>
            <form>
                <span>Enter Number of rows</span>
                <input 
                    value={props.totalRows} 
                    onChange={props.handleRowsChange} 
                />
                <br/>

                <span>Enter Number of columns</span>
                <input 
                    value={props.totalColumns} 
                    onChange={props.handleColumnsChange} 
                />
                <input type='submit' onClick={props.createGrid} />
            </form>
        </div>
    )
}

export default GridForm
