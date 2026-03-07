import express, { Request, Response } from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

const filePath = path.join(__dirname, 'data', 'tracks.json');

app.get('/api/music', (req: Request, res: Response) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return res.json([]);
    res.json(JSON.parse(data || '[]'));
  })
});

app.post('/api/music', (req: Request, res: Response) => {
  const newTrack = req.body;

  fs.readFile(filePath, 'utf8', (err, data) => {
    let tracks = [];
    if (!err && data) {
      try {
        tracks = JSON.parse(data);
      } catch (e) { tracks = [] };
    }

    tracks.unshift(newTrack);

    fs.writeFile(filePath, JSON.stringify(tracks, null, 2), (writeErr) => {
      if (writeErr) {
        return res.status(500).json({ error: "Saving error" });
      }
      res.json(newTrack);
    });
  });
});

app.listen(5000, () => console.log('Server is running on port 5000'));