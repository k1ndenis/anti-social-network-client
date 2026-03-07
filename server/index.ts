import express, { Request, Response } from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { Track } from './types/track'

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

const PORT = process.env.PORT || 5000;

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

app.delete('/api/music/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: "Read error" });

    let tracks: Track[] = [];
    try {
      tracks = JSON.parse(data || '[]');
    } catch (e) { tracks = []; }

    const updatedTracks = tracks.filter((track: Track) => track.id !== id);

    fs.writeFile(filePath, JSON.stringify(updatedTracks, null, 2), (writeErr) => {
      if (writeErr) return res.status(500).json({ error: "Delete error" });
      res.status(200).json({ message: "Deleted succesfully" });
    })
  })
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));