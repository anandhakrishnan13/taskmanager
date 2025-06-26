// backend/server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import taskRoutes from './routes/taskRoutes.js';


dotenv.config();
const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use('/tasks', taskRoutes);
app.get('/', (req, res) => {
  res.send('Server is up and running');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
