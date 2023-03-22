import express from 'express';
import taskRouter from './finco-router';
import userRouter from './user-router';
import path from 'path';

/**
 * Express application.
 */
const app = express();

app.use(express.json());

// Since API is not compatible with v1, API version is increased to v2
app.use('/api/v2', taskRouter, userRouter);

// Serve client files, un-comment this when developing
// app.use(express.static(path.join(__dirname, '/../../client/public')));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.info(`Server running on port ${port}`);
});

export default app;
