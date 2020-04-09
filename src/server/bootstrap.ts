import express from 'express';

import { addCorsMiddleware } from './middlewares/cors';
import { addStreamApi } from './api/stream';

const app = express();
const PORT = 80;

addCorsMiddleware(app);
addStreamApi(app);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
