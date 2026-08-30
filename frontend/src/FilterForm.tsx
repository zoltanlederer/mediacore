import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import MediaContext from './MediaContext'

function FilterForm () {
    const context = useContext(MediaContext)
    const [genres, setGenres] = useState<string[]>([])

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/genres`)
        .then(res => res.json())
        .then((res: string[]) => setGenres(res))
    }, [])

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