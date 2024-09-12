import express from 'express';
import imageRoutes from './routes/images';

export const app = express();
const port = 3000;

// Middleware to serve static files (original images)
app.use('/images', express.static('images'));

// Use the image resizing route
app.use('/api', imageRoutes);
app.get('/', (req, res) => {
  res.send('hello world');
});

app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});
