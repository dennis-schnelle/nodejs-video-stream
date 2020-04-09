import { Application } from 'express';
import cors from 'cors';

/**
 * Adds cors middleware
 * @param app Express app
 */
export const addCorsMiddleware = (app: Application): void => {
    app.use(cors({ credentials: true }));
};
