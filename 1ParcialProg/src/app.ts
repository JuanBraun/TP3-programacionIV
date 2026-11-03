import express from 'express';
import cafeRoutes from './routes/cafeRoutes';

const app = express();

app.use(express.json());

app.use('/api', cafeRoutes);

export default app;