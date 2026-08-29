import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { Media } from './types'

function MediaDetail () {
    const [item, setItem] = useState<Media | null>(null)
    const [notFound, setNotFound] = useState(false)
    const { index } = useParams();

    useEffect(() => {
        setNotFound(false)
        fetch(`http://localhost:3000/media/${index}`)
        .then(res => {
            if (!res.ok) {
                setNotFound(true)
            }
            return res.json()
        })
        .then(data => setItem(data))
    },[index])

    if(!item){
        return <p>Loading...</p>
    }

    if(notFound){
        return <p>Item not found!</p>
    }

    return (
        <>
        <Link to="/" className="detail-back-link">← Back to list</Link>
        <div className="detail-page">
            <img
                className="detail-poster"
                src={item.poster_path ? `https://image.tmdb.org/t/p/w342${item.poster_path}` : "/images/poster-placeholder.png"}
                alt={item.title}
            />
            <div className="detail-info">
                <h2 className="detail-title">{item.title}</h2>
                <p className="detail-meta">{item.genres} · {item.year} · ★ {item.imdb_rating}</p>
                <p className="detail-description">{item.description}</p>
                <p className="detail-fact"><strong>Director:</strong> {item.directors}</p>
                <p className="detail-fact"><strong>Cast:</strong> {item.cast}</p>
            </div>
        </div>
        </>
    )
}

export default MediaDetail