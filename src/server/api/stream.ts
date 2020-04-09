import { Application, Response } from 'express';

/**
 * TODOS:
 * - Proxy aws video mp4
 * - Chunk based requests
 * - Think about quality solution
 * - Think about API prefixing and versioning node.js (research)
 */

const GET_STREAM_ENDPOINT = `/stream`;

/**
 * Sends video chunks based on stream format and range
 * @param mock CSV sample
 */
const getStream = (req: Request, res: Response): void => {
    const sampleVideo = 'https://elasticbeanstalk-us-east-2-259633680310.s3.us-east-2.amazonaws.com/video_360p.mp4';
};

/**
 * Adds mocks to the api
 * @param app Express application
 */
export const addStreamApi = (app: Application): void => {
    app.get(GET_STREAM_ENDPOINT, getStream);
};
