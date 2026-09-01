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
  const [total, setTotal] = useState(0)
  const [limit, setLimit] = useState(0)
  const [loading, setLoading] = useState(true)

  // filters and page live in the URL (not useState) so they survive a refresh,
  // work with browser back/forward, and can be shared as a link
  const [searchParams, setSearchParams] = useSearchParams()

  const selectedSearch = searchParams.get('search') ?? ''
  const selectedGenre = searchParams.get('genre') ?? 'All'
  const selectedType = searchParams.get('type') ?? 'all'
  const page = Number(searchParams.get('page')) || 1

  useEffect(() => {
    setLoading(true)
    const baseUrl = `${import.meta.env.VITE_API_URL}/media`
    // this is a SEPARATE params object for the backend fetch request —
    // not the same as the frontend's own URL params above, even though
    // it's built from the same three values
    const params = new URLSearchParams()

    if (selectedSearch.length > 2) {
        params.append('search', selectedSearch)
    }
    if (selectedGenre.toLowerCase() != 'all') {
      params.append('genre', selectedGenre)
    }
    if (selectedType.toLowerCase() != 'all') {
      params.append('type', selectedType)
    }
    if (page > 1) {
      params.append('page', String(page))
    }

    const url = params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl

    fetch(url)
    .then(res => res.json())
    .then(fetchedData => {
      setLoading(false)  
      setData(fetchedData.data)
      setTotal(fetchedData.total)
      setLimit(fetchedData.limit)
    })
  }, [selectedSearch, selectedGenre, selectedType, page])

  const handleWatchedToggle = (selectedIndex: number) => {
    fetch(`${import.meta.env.VITE_API_URL}/media/${selectedIndex}/watched`, { method: 'PATCH' })
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

  const updateSearchParam = (value: string) => {
    const newParams = new URLSearchParams(searchParams)
    if (value.length < 2) {
        newParams.delete('search')
    } else {
        newParams.set('search', value)
    }
    newParams.delete('page')
    setSearchParams(newParams)
  }

  // resets page whenever genre changes, combined into the same params update
  // (calling this separately from a page-reset would race against stale searchParams)
  const updateGenreParam = (value: string) => {
    const newParams = new URLSearchParams(searchParams)
    if (value.toLocaleLowerCase() === 'all') {
        newParams.delete('genre')
    } else {
        newParams.set('genre', value)
    }
    newParams.delete('page')
    setSearchParams(newParams)
  }

  const updateTypeParam = (value: string) => {
    const newParams = new URLSearchParams(searchParams)
    if (value.toLocaleLowerCase() === 'all') {
        newParams.delete('type')
    } else {
        newParams.set('type', value)
    }
    // reset page here too, in the same params object — see updateGenreParam for why
    newParams.delete('page')
    setSearchParams(newParams)
  }

  const updatePageParam = (value: number) => {
    const newParams = new URLSearchParams(searchParams)
    if (value <= 1) {
        newParams.delete('page')
    } else {
        newParams.set('page', String(value))
    }
    setSearchParams(newParams)
  }


  return (
    <>
    <MediaContext.Provider value={{
      data,
      loading,
      page,
      onPageChange: updatePageParam,
      total,
      limit,
      onWatchedToggle: handleWatchedToggle,
      selectedGenre,
      onGenreChange: updateGenreParam,
      selectedType,
      onSelectedTypeChange: updateTypeParam,
      selectedSearch,
      onSearchChange: updateSearchParam,
    }}>
      <div className="app-container">
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
      </div>
    </MediaContext.Provider>
    </>
  )
}

export default AppContent
