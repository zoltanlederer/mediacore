import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Media } from './types'

function MediaDetail () {
    const [item, setItem] = useState<Media | null>(null)
    const [notFound, setNotFound] = useState(false)
    const { index } = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        setNotFound(false)
        fetch(`${import.meta.env.VITE_API_URL}/media/${index}`)
        .then(res => {
            if (!res.ok) {
                setNotFound(true)
            }
            return res.json()
        })
        .then(data => setItem(data))
    },[index])

    if(!item){
        return (
            <div className="loading-message">
                <div className="spinner"></div>
                Loading media library... this may take a moment on first load.
            </div>
        )
    }

    if(notFound){
        return <p>Item not found!</p>
    }

    return (
        <>
        <button className="detail-back-link" onClick={() => navigate(-1)}>← Back to list</button>
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