import express from 'express';
import type { Request, Response } from 'express';
import Database from 'better-sqlite3';
import cors from 'cors'

const app = express();
app.use(cors());
const db = new Database('./data/demo_media.db');

interface Media {
    "index": number,
    imdb_id: string,
    title: string,
    year: number,
    genres: string,
    runtime_mins: number,
    studio: string,
    tagline: string,
    description: string,
    tmdb_id: number,
    source: string,
    type: string,
    number_of_seasons: number,
    number_of_episodes: number,
    original_title: string,
    imdb_rating: number,
    release_date: string,
    directors: string,
    poster_path: string,
    "cast": string,
    watched: number,
    watchedAt: string | null,
}

interface WatchedUpdate {
    watched: number,
    watchedAt: string,
}

app.get('/', (req: Request, res: Response) => {
    res.send('API is running')
});

app.get('/media', (req: Request, res: Response) => {
    const baseQuery = 'SELECT * FROM media'
    const condition = []
    const params = []

    let page: number = 1;
    let limit: number = 20;
    let offset: number = 0;

    if (req.query.limit) {
        limit = Number(req.query.limit);
        if (isNaN(limit) || limit <=0 ){
            res.status(400).json({error: 'Limit parameter must be a number.'})
            return
        }
    }

    if (req.query.page) {
        page = Number(req.query.page);
        if (isNaN(page) || page <=0 ){
            res.status(400).json({error: 'Page parameter must be a number.'})
            return
        }
        // SQL OFFSET is zero-based, but "page" is 1-based for the user, so page 1 = no rows skipped
        offset = (page - 1) * limit
    }
    
    if (req.query.genre) {
        // LIKE with % wildcards since genres is a comma-separated string, not a single value (e.g. "Action, Comedy")
        condition.push('genres LIKE ?')
        params.push(`%${req.query.genre}%`)
    }

    if (req.query.type) {
        const types = ['movie', 'tv_show']
        const typeValue = String(req.query.type)
        if (!types.includes(typeValue)) {
            res.status(400).json({error: 'Type should be "movie" or "tv_show".'})
            return
        }
        // exact match here, unlike genre — type is a single fixed value ("movie" or "tv_show"), not a list
        condition.push('type = ?')
        params.push(req.query.type)
    }

    if (condition.length === 0){
        const allMedia = db.prepare<[number, number], Media>('SELECT * FROM media LIMIT ? OFFSET ?').all(limit, offset);
        const formattedMedia = allMedia.map(item => ({ ...item, watched: item.watched === 1 }))
        const getTotal = db.prepare<[], {total: number}>('SELECT COUNT(*) as total FROM media').get();
        
        if(!getTotal) {
            return
        }
        
        const data = {
            total: getTotal.total,
            page: page,
            limit: limit,
            data: formattedMedia
        }

        res.json(data)
        return
    } else {
        // safe to join with AND even if only one condition exists — join() on a single-item array just returns that item
        const conditionInString = condition.join(' AND ')
        const getMedia = db.prepare<any[], Media>(`${baseQuery} WHERE ${conditionInString} LIMIT ? OFFSET ?`).all(...params, limit, offset);
        const formattedMedia = getMedia.map(item => ({ ...item, watched: item.watched === 1 }))
        const getTotal = db.prepare<any[], {total: number}>(`SELECT COUNT(*) as total FROM media WHERE ${conditionInString}`).get(...params);
        
        if(!getTotal) {
            return
        }

        const data = {
            total: getTotal.total,
            page: page,
            limit: limit,
            data: formattedMedia
        }

        res.json(data)
        return
    }
});

app.get('/genres', (req: Request, res: Response) => {
    const genresDb = db.prepare<[], {genres: string}>('SELECT genres FROM media').all()
    const genresLists = genresDb.flatMap(row => row.genres.split(',')).map(item => item.trim())
    const genres = new Set(genresLists)
    const genresArray = Array.from(genres)
    res.json(genresArray.sort())
})

app.get('/media/:index', (req: Request<{index: number}>, res:Response) => {
    const item = db.prepare<[number], Media>(`SELECT * from media where "index" = ?`).get(Number(req.params.index))
    if (!item){
        res.status(404).json({error: 'Item not found'})
        return
    }
    res.json({ ...item, watched: item.watched === 1 })
})

app.patch('/media/:index/watched', (req: Request<{index: number}, {}, WatchedUpdate>, res: Response) => {
    // toggles watched status: unwatched -> watched (sets watchedAt), watched -> unwatched (clears watchedAt)
    const indexExist = db.prepare<[number], Media>(`SELECT * FROM media WHERE "index" = ?`).get(Number(req.params.index))

    if (!indexExist){
        res.status(404).json({error: 'Item not found'})
        return
    } else {
        const isWatched: number = indexExist.watched;
        let watchedUpdate: number;
        let watchedAt: string | null;
        
        if (isWatched === 0) {
            watchedUpdate = 1;
            watchedAt = new Date().toISOString();
        } else {
            watchedUpdate = 0;
            watchedAt = null
        }

        db.prepare<[number, string | null, number]>(`UPDATE media SET watched = ?, watchedAt = ? WHERE "index" = ?`).run(watchedUpdate, watchedAt, Number(req.params.index))
        res.json({ index: Number(req.params.index), watched: watchedUpdate === 1, watchedAt });
        return
    }
})

app.listen(3000, () => {
    console.log('Listening on port 3000');
});
