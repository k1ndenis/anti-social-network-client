import express from 'express';
import cors from 'cors';
import tracks from './data/tracks.json'

const app = express();

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.json('Server is running');
});

app.get('/api/music', (req, res) => {
  res.json(tracks);
});

app.listen(5000, () => console.log('Server is running on port 5000'));