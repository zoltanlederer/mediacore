import React, { useState, useEffect } from 'react'

interface FilterFormProps {
    selectedGenre: string;
    onGenreChange: (value: string) => void;
    selectedType: string;
    onSelectedTypeChange: (value: string) => void;
}

function FilterForm ({selectedGenre, onGenreChange, selectedType, onSelectedTypeChange}: FilterFormProps) {
    const [genres, setGenres] = useState<string[]>([])

    useEffect(() => {
        fetch('http://localhost:3000/genres')
        .then(res => res.json())
        .then((res: string[]) => setGenres(res))
    }, [])

    const handleGenre = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onGenreChange(e.target.value)
    }

    const handleSelectedType = ((e: React.ChangeEvent<HTMLSelectElement>) => {
        onSelectedTypeChange(e.target.value)
    })

    return (
        <>
        <select value={selectedGenre} onChange={handleGenre}>
            <option>All</option>
            {genres.map(genre => (
                <option key={genre}>{genre}</option>
            ))}
        </select>
        <select value={selectedType} onChange={handleSelectedType}>
            <option value='all'>All</option>
            <option value='movie'>Movie</option>
            <option value='tv_show'>TV Show</option>
        </select>
        </>
    )
}

export default FilterForm