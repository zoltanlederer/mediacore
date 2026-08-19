import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    fetch('http://localhost:3000/media')
    .then(res => res.json())
    .then(fetchedData => {
      setData(fetchedData)
    })
  }, [])

  return (
    <>
    <pre>{JSON.stringify(data)}</pre>
    </>
  )
}

export default App
