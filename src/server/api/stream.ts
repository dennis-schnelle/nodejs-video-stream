import { Application, Request, Response } from 'express';
import { requestProvider, parseProtocol } from '../utils';
import { getVideoByIdRequest, getVideosRequest, Video, VideoSource } from '../services/video';
import es from 'event-stream';
import { IncomingMessage, IncomingHttpHeaders } from 'http';

type VideoStreamRequestParams = {
    id: string;
    source: string;
};

type VideosRequestParams = {};

type MediaFileHeaders = {
    'accept-ranges'?: string;
    'content-range'?: string;
    'content-type'?: string;
    'content-length'?: string;
};

/**
 * TODOS:
 * - Think about quality solution - later
 * - Think about API prefixing and versioning node.js (research)
 */

const GET_VIDEO_STREAM__ENDPOINT = `/w/:id/:source`;
const GET_VIDEOS__ENDPOINT = '/videos';

/**
 * Maps media file headers for media stream buffering
 * @param headers IncomingHttpHeaders
 */
const mapMediaFileHeaders = (headers: IncomingHttpHeaders): MediaFileHeaders => {
    const mediaFileHeaders: MediaFileHeaders = {
        'content-length': headers['content-length'],
        'content-type': headers['content-type'],
    };

    if (headers['content-range']) {
        mediaFileHeaders['content-range'] = headers['content-range'];
        mediaFileHeaders['accept-ranges'] = headers['accept-ranges'];
    }

    return mediaFileHeaders;
};

/**
 * Tunnels request to external url and includes Range-Header
 * @param req Express req object
 * @param res Express res stream
 */
const mediaProxyStream = (req: Request, res: Response) =>
    es.map((data: VideoSource) =>
        requestProvider(parseProtocol(data.source)).get(
            data.source,
            {
                headers: {
                    Range: req.headers['range'] || '',
                },
            },
            (response: IncomingMessage) => {
                res.writeHead(req.headers['range'] ? 206 : 200, mapMediaFileHeaders(response.headers));
                response.pipe(res);
            },
        ),
    );

/**
 * Finds source according to sourceId
 * @param sourceId
 */
const mapSourceStream = (sourceId: string) =>
    es.map((data: Video, callback) =>
        callback(
            null,
            data.sources.find(source => source.id === sourceId),
        ),
    );

/**
 * Get Video request
 * @param req
 * @param res
 */
const getVideo = (req: Request, res: Response) =>
    // TODO: Cache this?
    getVideoByIdRequest(req.params.id, (response: IncomingMessage) =>
        response
            .pipe(es.parse())
            .pipe(mapSourceStream(req.params.source))
            .pipe(mediaProxyStream(req, res)),
    );

/**
 * Gets all videos
 * @param req
 * @param res
 */
const getVideos = (req: Request, res: Response) => getVideosRequest((response: IncomingMessage) => response.pipe(res));

/**
 * Adds mocks to the api
 * @param app Express application
 */
export const addStreamApi = (app: Application): void => {
    app.get<VideoStreamRequestParams>(GET_VIDEO_STREAM__ENDPOINT, getVideo);
    app.get<VideosRequestParams>(GET_VIDEOS__ENDPOINT, getVideos);
};
