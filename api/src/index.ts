import express from 'express';
import type { Request, Response } from 'express';

const app = express()

app.get('/', (req: Request, res: Response) => {
    res.send('API is running')
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});