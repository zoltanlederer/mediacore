import { useState, useEffect } from 'react'
import './App.css'
import type { Media } from './types'
import MediaList from './MediaList'

function App() {
  const [data, setData] = useState<Media[]>([])

  useEffect(() => {
    fetch('http://localhost:3000/media')
    .then(res => res.json())
    .then(fetchedData => {
      setData(fetchedData)
    })
  }, [])

  const handleWatchedToggle = (selectedIndex: number) => {
    fetch(`http://localhost:3000/media/${selectedIndex}/watched`, { method: 'PATCH' })
    .then(res => res.json())
    .then(watchedItem => (
      // update only the matching row, keeping all other rows unchanged (avoids refetching the whole list)
      setData(prevData => 
        prevData.map(item => 
          item.index === selectedIndex ? { ...item, watched: watchedItem.watched } : item
        )
      )
    ))
  }

  return (
    <>
    <MediaList data={data} onWatchedToggle={handleWatchedToggle} />
    </>
  )
}

export default App
