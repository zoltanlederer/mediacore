import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import MediaContext from './MediaContext'

function FilterForm () {
    const context = useContext(MediaContext)
    const [genres, setGenres] = useState<string[]>([])
    // local state lets the input feel responsive on every keystroke;
    // the actual search (context.onSearchChange) only fires after the debounce below
    const [searchInput, setSearchInput] = useState(context?.selectedSearch ?? '')

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/genres`)
        .then(res => res.json())
        .then((res: string[]) => setGenres(res))
    }, [])

    // debounce: wait 400ms after the user stops typing before triggering a real search,
    // avoiding a fetch on every single keystroke. Each keystroke cancels the previous
    // timer via the cleanup function, so only the last pause actually fires.
    useEffect(() => {
        const timer = setTimeout(() => {
            context?.onSearchChange(searchInput)
        }, 400)
        return () => clearTimeout(timer)
    }, [searchInput])

    // keeps searchInput in sync when selectedSearch changes from elsewhere
    // (e.g. clicking the logo resets the URL, but wouldn't otherwise clear this local state
    useEffect(() => {
        setSearchInput(context?.selectedSearch ?? '')
    }, [context?.selectedSearch])

    if(!context) {
        return null
    }
    
    // page reset happens inside onGenreChange/onSelectedTypeChange themselves,
    // not here — combining updates avoids a stale-state race with setSearchParams
    const handleGenre = (e: React.ChangeEvent<HTMLSelectElement>) => {
        context.onGenreChange(e.target.value)
    }
    
    const handleSelectedType = ((e: React.ChangeEvent<HTMLSelectElement>) => {
        context.onSelectedTypeChange(e.target.value)
    })

    return (
        <div className="app-header">
            <Link to="/" className="logo-link">MediaCore</Link>
            <div className="filters">
                <div className="filter-group">
                    <label htmlFor="search-input">Search</label>
                    <input id='search-input' type='text' placeholder='Search titles...' value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
                </div>
                <div className="filter-group">
                    <label htmlFor="genre-select">Genre</label>
                    <select id="genre-select" value={context.selectedGenre} onChange={handleGenre}>
                        <option>All</option>
                        {genres.map(genre => (
                            <option key={genre}>{genre}</option>
                        ))}
                    </select>
                </div>
                <div className="filter-group">
                    <label htmlFor="type-select">Type</label>
                    <select id="type-select" value={context.selectedType} onChange={handleSelectedType}>
                        <option value='all'>All</option>
                        <option value='movie'>Movie</option>
                        <option value='tv_show'>TV Show</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default FilterForm