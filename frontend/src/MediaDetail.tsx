import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import MediaContext from "./MediaContext";

function MediaDetail () {
    const context = useContext(MediaContext)

    if (!context) {
        return null
    }

    const { index } = useParams();
    const item = context.data.find(mediaItem => mediaItem.index === Number(index))

    if (!item) {
        return <p>Not found</p>
    }

    return (
        <>
        <p>Media title: {item.title}</p>
        <Link to="/">← Back to list</Link>
        </>
    )
}

export default MediaDetail