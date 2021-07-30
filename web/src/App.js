import { useEffect, useState } from 'react'

function App() {
  const [time, setTime] = useState(0)
  useEffect(() => {
    fetch('/api/time')
      .then((res) => res.json())
      .then((data) => {
        setTime(data.time)
      })
  }, [])
  return (
    <div className="bg-red-500">
      <h1 className="p-4">{time}</h1>
    </div>
  )
}

export default App
