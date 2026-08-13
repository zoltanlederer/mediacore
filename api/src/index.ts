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
    if (req.query.genre) {
        const genre = req.query.genre;
        const getGenre = db.prepare<[string], Media>('SELECT * FROM media WHERE genres LIKE ?').all(`%${genre}%`);
        res.json(getGenre);
        return
    }
    const allMedia = db.prepare<[], Media>('SELECT * FROM media').all();
    res.json(allMedia)
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});
