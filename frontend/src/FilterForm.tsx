import { useState, useEffect } from 'react'

interface FilterFormProps {
    selectedGenre: string;
    onGenreChange: (value: string) => void;
}

function FilterForm ({selectedGenre, onGenreChange}: FilterFormProps) {
    const [genres, setGenres] = useState<string[]>([])

    useEffect(() => {
        fetch('http://localhost:3000/genres')
        .then(res => res.json())
        .then((res: string[]) => setGenres(res))
    }, [])

    const handleGenre = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onGenreChange(e.target.value)
    }

    return (
        <>
        <select value={selectedGenre} onChange={handleGenre}>
            <option>All</option>
            {genres.map(genre => (
                <option key={genre}>{genre}</option>
            ))}
        </select>
        </>
    )
}

export default FilterForm