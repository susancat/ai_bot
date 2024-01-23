import express from 'express';
import { config } from 'dotenv';
import morgan from'morgan';
import appRouter from './routes/index';
config();

const app = express();

// middleware to use JSON 
app.use(express.json());
// middleware to have a lock msg when send API request, to be removed in prod
app.use(morgan('dev'));
app.use("/api/v1", appRouter);

export default app;