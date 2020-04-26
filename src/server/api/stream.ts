import { Application, Request, Response } from 'express';
import { requestProvider, parseProtocol } from '../utils';
import { getVideoByIdRequest, getVideosRequest, Video, VideoSource } from '../services/video';
import es from 'event-stream';
import { IncomingMessage, IncomingHttpHeaders } from 'http';

const ENDPOINT__GET_VIDEO_STREAM = `/w/:id/:source`;
const ENDPOINT__GET_VIDEOS = '/videos';

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
 * Maps media file headers for media stream buffering
 * @param headers IncomingHttpHeaders
 */
const mapMediaFileHeaders = (headers: IncomingHttpHeaders): MediaFileHeaders => ({
    'accept-ranges': headers['accept-ranges'] || '',
    'content-length': headers['content-length'] || '',
    'content-range': headers['content-range'] || '',
    'content-type': headers['content-type'] || '',
});

/**
 * Tunnels request to external url and includes Range-Header
 * @param req Express req object
 * @param res Express res stream
 */
const proxyStream = (req: Request): es.MapStream =>
    es.map((data: VideoSource, callback: (context: null, response: IncomingMessage) => void) =>
        requestProvider(parseProtocol(data.source)).get(
            data.source,
            {
                headers: {
                    Range: req.headers['range'] || '',
                },
            },
            (response: IncomingMessage) => callback(null, response),
        ),
    );

/**
 * Maps Stream response headers to current response stream
 * @param req
 * @param res
 */
const writeProxyHeaders = (req: Request, res: Response): es.MapStream =>
    es.map((data: IncomingMessage, callback: (context: null, response: IncomingMessage) => void) => {
        res.writeHead(req.headers['range'] ? 206 : 200, mapMediaFileHeaders(data.headers));
        callback(null, data);
    });

/**
 * Finds source according to sourceId
 * @param sourceId
 */
const mapVideoSource = (sourceId: string): es.MapStream =>
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
    getVideoByIdRequest(req.params.id, (response: IncomingMessage) =>
        response
            /* Parse JSON Response */
            .pipe(es.parse())
            /* Map video source entity */
            .pipe(mapVideoSource(req.params.source))
            /* Tunnel request into video soure url */
            .pipe(proxyStream(req))
            /* Extract media headers into response */
            .pipe(writeProxyHeaders(req, res))
            /* Pipe proxy response to our endpoint response */
            .pipe(es.map(proxy => proxy.pipe(res))),
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
    app.get<VideoStreamRequestParams>(ENDPOINT__GET_VIDEO_STREAM, getVideo);
    app.get<VideosRequestParams>(ENDPOINT__GET_VIDEOS, getVideos);
};
