import express from 'express';
import cors from 'cors';
import { router } from '@/router';

export const app = express();

app.use(cors());
app.use('/api', router);
