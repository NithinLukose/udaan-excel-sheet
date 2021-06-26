import React,{useState} from 'react'

function GridCell(props) {
    const [cellValue,setCellValue] = useState('')

    const handleCellValueChange = (e) => {
        setCellValue(e.target.value)
        props.setGridCellValue(e.target.value)
    }

    return (
        <div 
            style={{
                border:`2px solid ${props.activeCell===`${props.row} ${props.col}`?'green':'black'}`,
                width:'50px',
                height:'50px',
                cursor:'pointer'
            }}
            id={`${props.row} ${props.col}`}
        >
            <input 
                id={`${props.row} ${props.col}`}
                value={cellValue} 
                onChange={handleCellValueChange}
                style={{
                    maxWidth:'100%',
                    border:'none',
                    maxHeight:'100%',
                    outline:'none'
                }}
            />
        </div>
    )
}

export default GridCell
