import React,{useState} from 'react'
import GridForm from './GridForm'
import GridCell from './GridCell'

function ExcelGrid() {

    const [totalRows,setTotalRows] = useState(0)
    const [totalColumns,setTotalColumns] = useState(0)
    const [grid,setGrid] = useState([])
    const [activeCell,setActiveCell] = useState('0 0')

    const handleRowsChange = (e) => {
        setTotalRows(Number(e.target.value))
    }

    const handleColumnsChange = (e) => {
        setTotalColumns(Number(e.target.value))
    }

    const createGrid = (e) => {
        e.preventDefault()
        let excelGrid = new Array(totalRows)
        for(let i = 0;i<totalRows;i++){
            excelGrid[i] = new Array(totalColumns)
            for(let j = 0;j<totalColumns;j++){
                excelGrid[i][j] = {
                    value:0,
                    expression:''
                }
            }
        }
        setGrid(excelGrid)
        setTotalRows(0)
        setTotalColumns(0)
    }

    const highlightActiveCell = (e) => {
        setActiveCell(e.target.id)
    }

    const getRow = () => {
        let cell = activeCell.split(' ')
        return cell[0]
    }

    const getCol = () => {
        let cell = activeCell.split(' ')
        return cell[1]
    }


    const evaluateSum = (firstRow,firstCol,lastRow,lastCol) =>{
        
        let sum = 0
        let col = 0;
        for(let i=firstRow;i<=lastRow;i++){
            if(firstRow<lastRow){
                col = grid[0].length-1; 
            }
            else{
                col = lastCol
            }
            for(let j = firstCol;j<=col;j++){
                sum += grid[i][j].value;
            }
        }

        return sum;
        
    }

    const setGridCellValue = (value) => {
        let row = getRow()
        let col = getCol()
        if(Number(value)){            
            grid[row][col].value = Number(value);

            return;
        }
        else{
            grid[row][col].value=0
        }
        let firstPart = value.slice(0,5)
        if(firstPart === '=sum('){
            let colonIndex = value.indexOf(':')
            let closingBracketIndex = value.indexOf(')')

            if(colonIndex===-1||closingBracketIndex===-1){
                return
            }
            grid[row][col].expression = value
            let firstCell = value.slice(5,colonIndex);
            let lastCell = value.slice(colonIndex+1,closingBracketIndex)

            let startRow = firstCell.split(' ')[0];
            let startCol = firstCell.split(' ')[1];

            let lastRow = lastCell.split(' ')[0]
            let lastCol = lastCell.split(' ')[1]

            let sum = evaluateSum(startRow-1,startCol-1,lastRow-1,lastCol-1)
            console.log(sum)
            let excelGrid = grid
            excelGrid[row][col].value = sum
            console.log(excelGrid)
            setGrid(excelGrid)

        }
        
    }

    return (
        <div>
            <GridForm 
                totalRows={totalRows}
                totalColumns = {totalColumns}
                handleRowsChange={handleRowsChange}
                handleColumnsChange={handleColumnsChange}
                createGrid={createGrid}
            />
            <div onClick={highlightActiveCell}>
                {grid.map((row,rowIndex)=>{
                    return (
                        <div key={rowIndex} style={{
                            display:'flex',
                        }}>
                            {row.map((cell,colIndex)=>(
                                <GridCell 
                                    key={colIndex} 
                                    row={rowIndex} 
                                    col={colIndex} 
                                    activeCell={activeCell}
                                    setGridCellValue={setGridCellValue}
                                    gridCellValue = {grid[rowIndex][colIndex].value}
                                    gridCellExpression = {grid[rowIndex][colIndex].expression}
                                />
                            ))}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ExcelGrid
