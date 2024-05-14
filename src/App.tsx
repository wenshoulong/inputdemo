import SelectCheckBox from './components/SelectCheckBox'
import { useState } from 'react'

function App() {
  const [columns, setColumns] = useState(1)

  return (
    <div className="App">
      <SelectCheckBox columns={columns} />
      <div
        style={{
          margin: '50px',
          display: 'flex',
        }}
      >
        <div> columns:</div>
        <button onClick={() => setColumns(columns - 1)}> - </button>
        <input value={columns}></input>
        <button onClick={() => setColumns(columns + 1)}> + </button>
      </div>
    </div>
  )
}

export default App
