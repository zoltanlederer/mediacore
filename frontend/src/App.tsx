import { useState, useEffect } from 'react'
import './App.css'
import type { Media } from './types'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MediaContext from './MediaContext'
import MediaList from './MediaList'
import MediaDetail from './MediaDetail'
import FilterForm from './FilterForm'

function App() {
  const [data, setData] = useState<Media[]>([]) 
  const [selectedGenre, setSelectedGenre] = useState('All')
  const [selectedType, setSelectedType] = useState('all')

  useEffect(() => {
    const baseUrl = 'http://localhost:3000/media'
    const params = new URLSearchParams()

    if (selectedGenre.toLocaleLowerCase() != 'all') {
      params.append('genre', selectedGenre)
    }
    if (selectedType.toLocaleLowerCase() != 'all') {
      params.append('type', selectedType)
    }

    const url = params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl

    fetch(url)
    .then(res => res.json())
    .then(fetchedData => {
      setData(fetchedData)
    })
  }, [selectedGenre, selectedType])

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
    <MediaContext.Provider value={{
      data,
      onWatchedToggle: handleWatchedToggle,
      selectedGenre,
      onGenreChange: setSelectedGenre,
      selectedType,
      onSelectedTypeChange: setSelectedType
    }}>
      <BrowserRouter>
        <Routes>        
          <Route path="/" element={
            <>
              <FilterForm />
              <MediaList />
            </>
          }/>
          <Route path="/media/:index" element={<MediaDetail />} />
        </Routes>      
      </BrowserRouter>
    </MediaContext.Provider>
    </>
  )
}

export default App
