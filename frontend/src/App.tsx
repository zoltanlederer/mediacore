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
            <td>{item.watched}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </>
  )
}

export default App
