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
    <table>
      <thead>
        <tr>
          <th>TITLE</th>
          <th>GENRE</th>
          <th>YEAR</th>
          <th>RATING</th>
          <th>TYPE</th>
          <th>WATCHED</th>
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr key={item.index}>
            <td>{item.title}</td>
            <td>{item.genres}</td>
            <td>{item.year}</td>
            <td>{item.imdb_rating}</td>
            <td>{item.type}</td>
            <td onClick={() => handleWatchedToggle(item.index)}>{item.watched ? '✅' : '❌'}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </>
  )
}

export default App
