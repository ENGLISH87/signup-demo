import cors from 'cors';
import express from 'express';

const app = express();
const PORT = 3000;

// Enable CORS for all origins
app.use(cors());
app.use(express.json());
app.post('/api/signup', (req, res) => {
  // Simulate a successful response
  res.status(200).json();
});

app.listen(PORT, () => {
  console.log(`Mock server running at http://localhost:${PORT}`);
});
