import http from 'http';
import https from 'https';
import { parse } from 'url';

/**
 * Chooses between http and https request adapter based on protocol
 * @param protocol
 */
export const requestProvider = (protocol: string): typeof https | typeof http => (protocol === 'https:' ? https : http);

/**
 * Parses url protocol
 * @param url string
 */
export const parseProtocol = (url: string): string => parse(url).protocol;
