import { useState, useEffect } from 'react'

function FilterForm () {
    const [genres, setGenres] = useState<string[]>([])
    const [selectedGenre, setSelectedGenre] = useState('All')

    useEffect(() => {
        fetch('http://localhost:3000/genres')
        .then(res => res.json())
        .then((res: string[]) => setGenres(res))
    }, [])

    const handleGenre = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedGenre(e.target.value)
    }

    return (
        <>
        <select onChange={handleGenre}>
            <option>All</option>
            {genres.map(genre => (
                <option key={genre}>{genre}</option>
            ))}
        </select>
        </>
    )
}

export default FilterForm