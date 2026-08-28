import { useState, useEffect, useContext } from 'react'
import MediaContext from './MediaContext'

function FilterForm () {
    const context = useContext(MediaContext)
    const [genres, setGenres] = useState<string[]>([])

    useEffect(() => {
        fetch('http://localhost:3000/genres')
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
        <>
        <select value={context.selectedGenre} onChange={handleGenre}>
            <option>All</option>
            {genres.map(genre => (
                <option key={genre}>{genre}</option>
            ))}
        </select>
        <select value={context.selectedType} onChange={handleSelectedType}>
            <option value='all'>All</option>
            <option value='movie'>Movie</option>
            <option value='tv_show'>TV Show</option>
        </select>
        </>
    )
}

export default FilterForm