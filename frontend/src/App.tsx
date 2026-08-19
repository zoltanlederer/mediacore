import { useState, useEffect } from 'react'
import './App.css'
import type { Media } from './types'

function App() {
  const [data, setData] = useState<Media[]>([])

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
