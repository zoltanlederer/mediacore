import { useState, useEffect } from 'react'
import './App.css'
import type { Media } from './types'
import { Routes, Route, useSearchParams } from 'react-router-dom'
import MediaContext from './MediaContext'
import MediaList from './MediaList'
import MediaDetail from './MediaDetail'
import FilterForm from './FilterForm'
import Pagination from './Pagination'

function AppContent() {
  const [data, setData] = useState<Media[]>([]) 
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [limit, setLimit] = useState(0)
  const [selectedGenre, setSelectedGenre] = useState('All')
  const [selectedType, setSelectedType] = useState('all')

  const [searchParams, setSearchParams] = useSearchParams()

  console.log(searchParams.get('genre'))
  console.log(searchParams.get('page'))

  useEffect(() => {
    const baseUrl = 'http://localhost:3000/media'
    const params = new URLSearchParams()

    if (selectedGenre.toLocaleLowerCase() != 'all') {
      params.append('genre', selectedGenre)
    }
    if (selectedType.toLocaleLowerCase() != 'all') {
      params.append('type', selectedType)
    }
    if (page > 1) {
      params.append('page', String(page))
    }

    const url = params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl

    fetch(url)
    .then(res => res.json())
    .then(fetchedData => {
      setData(fetchedData.data)
      setPage(fetchedData.page)
      setTotal(fetchedData.total)
      setLimit(fetchedData.limit)
    })
  }, [selectedGenre, selectedType, page])

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
      page,
      setPage,
      total,
      limit,
      onWatchedToggle: handleWatchedToggle,
      selectedGenre,
      onGenreChange: setSelectedGenre,
      selectedType,
      onSelectedTypeChange: setSelectedType,
    }}>
      <>
        <Routes>        
          <Route path="/" element={
            <>
              <FilterForm />
              <MediaList />
              <Pagination />
            </>
          }/>
          <Route path="/media/:index" element={<MediaDetail />} />
        </Routes>      
      </>
    </MediaContext.Provider>
    </>
  )
}

export default AppContent
