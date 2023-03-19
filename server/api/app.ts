import express from 'express';
import taskRouter from './finco-router';
import userRouter from './user-router';

/**
 * Express application.
 */
const app = express();

app.use(express.json());

// Since API is not compatible with v1, API version is increased to v2
app.use('/api/v2', taskRouter, userRouter);

export default app;
