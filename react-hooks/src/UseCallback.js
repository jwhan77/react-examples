import React, { useState, useEffect, useCallback } from 'react'

const App = () => {
  const [total, setTotal] = useState(0);
  const [nothing, setNothing] = useState(false);

  const getRandomNumbers = useCallback((max) => {
    const numbers = []
    for(let i=0; i<total; i++) {
      numbers.push(Math.floor(Math.random() * max))
    }
    return numbers;
  }, [total])

  const getRandomNumbers2 = (max) => {
    const numbers = []
    for(let i=0; i<total; i++) {
      numbers.push(Math.floor(Math.random() * max))
    }
    return numbers;
  }
  
  return (
    <div>
      <label>
        How many numbers do you want to generate?
        <input
          type="number"
          value={total}
          onChange={e => setTotal(parseInt(e.target.value))}
        />
      </label>
      
      <div>Range: 0~5</div>
      <WithCallback getRandomNumbers={getRandomNumbers} />
      <WithoutCallback getRandomNumbers2={getRandomNumbers2} />

      <button onClick={() => setNothing(!nothing)}>Do nothing</button>
      {nothing && <div>nothing</div>}
    </div>
  )
}

function WithCallback({ getRandomNumbers }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    console.log('Render WithCallback')
    setItems(getRandomNumbers(5));
  }, [getRandomNumbers])


  return (
    <div>
      With: {items.join(", ")}
    </div>
  )
}

function WithoutCallback({ getRandomNumbers2 }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    console.log('Render WithoutCallback')
    setItems(getRandomNumbers2(5));
  }, [getRandomNumbers2])


  return (
    <div>
      Without: {items.join(", ")}
    </div>
  )
}

export default App
