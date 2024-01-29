import express from 'express';
import { config } from 'dotenv';
import morgan from'morgan';
import appRouter from './routes/index';
import cookieParser from 'cookie-parser';
import cors from 'cors';

config();
const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true })); //only from this domain with credentials can access data
// middleware to use JSON 
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
// middleware to have a lock msg when send API request, to be removed in prod
app.use(morgan('dev'));
app.use("/api/v1", appRouter);

export default app;