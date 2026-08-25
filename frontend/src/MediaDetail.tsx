import { useParams } from "react-router-dom";
import type { Media } from './types';

interface MediaDetaillProps {
    data: Media[];
}

function MediaDetail ({data}: MediaDetaillProps) {
    const { index } = useParams();
    const item = data.find(mediaItem => mediaItem.index === Number(index))

    if (!item) {
        return <p>Not found</p>
    }

    return (
        <>
        <p>Media title: {item.title}</p>
        </>
    )
}

export default MediaDetail