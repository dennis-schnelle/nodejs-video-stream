import { Application, Request, Response } from 'express';
import { requestProvider, parseProtocol } from '../utils';
import { getVideoByIdRequest, Video, VideoSource, getVideosRequest } from '../services/video';
import es from 'event-stream';

type VideoStreamRequestParams = {
    id: string;
    source: string;
};

type VideosRequestParams = {};

/**
 * TODOS:
 * - Think about quality solution - later
 * - Think about API prefixing and versioning node.js (research)
 */

const GET_VIDEO_STREAM__ENDPOINT = `/w/:id/:source`;
const GET_VIDEOS__ENDPOINT = '/videos';

/**
 * Collects content response headers
 * @param response HTTP Response
 */
const extractContentHeaders = response => {
    const contentHeaders = {
        'Content-Length': response.headers['content-length'],
        'Content-Type': response.headers['content-type'],
    };

    const rangeHeaders = {};

    if (response.headers['content-range']) {
        rangeHeaders['Content-Range'] = response.headers['content-range'];
        rangeHeaders['Accept-Ranges'] = response.headers['accept-ranges'];
    }

    return {
        ...rangeHeaders,
        ...contentHeaders,
    };
};

/**
 * Tunnels request to external url and includes Range-Header
 * @param req Express req object
 * @param res Express res stream
 */
const cdnProxyTunnel = (req: Request, res: Response) =>
    es.map((data: VideoSource) =>
        requestProvider(parseProtocol(data.source)).get(
            data.source,
            {
                headers: {
                    Range: req.headers['range'] || '',
                },
            },
            response => {
                res.writeHead(req.headers['range'] ? 206 : 200, extractContentHeaders(response));
                response.pipe(res);
            },
        ),
    );

/**
 * Finds source according to sourceId
 * @param sourceId
 */
const mapSource = (sourceId: string) =>
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
    getVideoByIdRequest(req.params.id, response =>
        response
            .pipe(es.parse())
            .pipe(mapSource(req.params.source))
            .pipe(cdnProxyTunnel(req, res)),
    );

/**
 * Gets all videos
 * @param req
 * @param res
 */
const getVideos = (req: Request, res: Response) => getVideosRequest(response => response.pipe(res));

/**
 * Adds mocks to the api
 * @param app Express application
 */
export const addStreamApi = (app: Application): void => {
    app.get<VideoStreamRequestParams>(GET_VIDEO_STREAM__ENDPOINT, getVideo);
    app.get<VideosRequestParams>(GET_VIDEOS__ENDPOINT, getVideos);
};
