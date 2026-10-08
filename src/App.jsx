import './App.css'
import { useState } from 'react'

const INITIAL_COUNTS = [
  { id: crypto.randomUUID(), value: 0 },
  { id: crypto.randomUUID(), value: 0 },
  { id: crypto.randomUUID(), value: 0 }
]

function App() {
  // counts 상태를 배열로 관리
  const [counts, setCounts] = useState(INITIAL_COUNTS)

  // index 대신 id로 변경
  const onIncrement = (id) => {
    setCounts(prevCounts =>
      prevCounts.map(item =>
        item.id === id ? { ...item, value: item.value + 1 } : item
      )
    )
  }

  // 배열에 새로운 카운터 값을 추가 (초기값 0)
  const onAddCounter = () => {
    setCounts(prevCounts => [...prevCounts, { id: crypto.randomUUID(), value: 0 }])
  }

  // id가 같으면 필터링하고, 다른 id는 그대로 유지
  const onRemoveCounter = (id) => {
    setCounts(prevCounts => prevCounts.filter(item => item.id !== id))
  }

  const total = counts.reduce((sum, current) => sum + current.value, 0)

  return (
    <div>
      <h1>총합: {total}</h1>
      <button
        onClick={
          onAddCounter
        }>
          카운터 추가
        </button>
        
      {
        counts.map((item) => (
          <Counter
            key={item.id} // UUID를 key로 사용
            count={item.value}
            onIncrement={() => { onIncrement(item.id) }}
            onRemove={() => { onRemoveCounter(item.id) }}
          />
        ))
      }
    </div>
  )
}

function Counter({ count, onIncrement, onRemove }) {
  const [bgColor, setBgColor] = useState(
    () => '#' + Math.floor(Math.random()*16777215)
      .toString(16)
      .padStart(6, '0')
  )

  return (
    <div style={{ backgroundColor: bgColor }}>
      <h1>Counter: {count}</h1>
      <button onClick={onIncrement}>
        증가
      </button>
      <button onClick={onRemove}>
        제거
      </button>
    </div>
  )
}

export default App