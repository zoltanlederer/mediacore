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
    let page: number = 1;
    let limit: number = 20;

    if (req.query.page) {
        page = Number(req.query.page);
    }

    if (req.query.limit) {
        limit = Number(req.query.limit);
    }

    // SQL OFFSET is zero-based, but "page" is 1-based for the user, so page 1 = no rows skipped
    const offset = (page - 1) * limit

    if (req.query.genre) {
        const genre = req.query.genre;
        // LIKE with % wildcards since genres is a comma-separated string, not a single value (e.g. "Action, Comedy")
        const getGenre = db.prepare<[string, number, number], Media>('SELECT * FROM media WHERE genres LIKE ? LIMIT ? OFFSET ?').all(`%${genre}%`, limit, offset);
        res.json(getGenre);
        return
    }
    const allMedia = db.prepare<[number, number], Media>('SELECT * FROM media LIMIT ? OFFSET ?').all(limit, offset);
    res.json(allMedia)
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});
