import express from 'express';
import type { Request, Response } from 'express';
import Database from 'better-sqlite3';

const app = express()
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
    let offset: number = 0

    if (req.query.limit) {
        limit = Number(req.query.limit);
    }

    if (req.query.page) {
        page = Number(req.query.page);
        // SQL OFFSET is zero-based, but "page" is 1-based for the user, so page 1 = no rows skipped
        offset = (page - 1) * limit
    }
    
    if (req.query.genre) {
        // LIKE with % wildcards since genres is a comma-separated string, not a single value (e.g. "Action, Comedy")
        condition.push('genres LIKE ?')
        params.push(`%${req.query.genre}%`)
    }

    if (req.query.type) {
        // exact match here, unlike genre — type is a single fixed value ("movie" or "tv_show"), not a list
        condition.push('type = ?')
        params.push(req.query.type)
    }

    if (condition.length === 0){
        const allMedia = db.prepare<[number, number], Media>('SELECT * FROM media LIMIT ? OFFSET ?').all(limit, offset);
        res.json(allMedia)
        return
    } else {
        // safe to join with AND even if only one condition exists — join() on a single-item array just returns that item
        const conditionInString = condition.join(' AND ')
        const getMedia = db.prepare<any[], Media>(`${baseQuery} WHERE ${conditionInString} LIMIT ? OFFSET ?`).all(...params, limit, offset);
        res.json(getMedia);
        return
    }
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});
