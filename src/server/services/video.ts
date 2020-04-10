import { requestProvider, parseProtocol } from '../utils';
import { IncomingMessage } from 'http';

export type Video = {
    id: number;
    filename: string;
    title: string;
    sources: VideoSource[];
};

export type VideoSource = {
    id: string;
    resolution: string;
    source: string;
};

const VIDEODB_MOCK_HOST = 'http://localhost:3000';

export const getVideoByIdRequest = (id: string, callback: (response: IncomingMessage) => void) =>
    requestProvider(parseProtocol(VIDEODB_MOCK_HOST)).get(`${VIDEODB_MOCK_HOST}/videos/${id}`, callback);

export const getVideosRequest = (callback: (response: IncomingMessage) => void) =>
    requestProvider(parseProtocol(VIDEODB_MOCK_HOST)).get(`${VIDEODB_MOCK_HOST}/videos`, callback);
