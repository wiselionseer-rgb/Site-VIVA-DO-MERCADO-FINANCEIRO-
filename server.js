import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Serve the static files from the React app
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
