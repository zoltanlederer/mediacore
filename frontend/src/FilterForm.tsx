import { useState, useEffect } from 'react'

function FilterForm () {
    const [genres, setGenres] = useState<string[]>([])

    useEffect(() => {
        fetch('http://localhost:3000/genres')
        .then(res => res.json())
        .then((res: string[]) => setGenres(res))
    }, [])

    return (
        <>
        <p>{genres}</p>
        </>
    )
}

export default FilterForm