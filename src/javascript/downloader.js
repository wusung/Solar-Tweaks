import { createHash } from 'crypto';
import axios from 'axios';
import fs from './fs';
import { createWriteStream } from 'fs';

import Logger from './logger';
const logger = new Logger('downloader');

/**
 * Downloads and saves a file from a URL to the given path
 * @param {string} url URL of the file to download
 * @param {string} path Path where to save the file
 * @param {'text'|'blob'} fileType Type of the file to download
 * @param {string} [hash=null] SHA1 hash of the file to make sure it's the same
 * @param {'sha1'|'sha256'} [algorithm='sha1'] Hash algorithm to use
 * @param {boolean} [logging=true] Whether or not to log
 * @param {boolean} [skipFolderCheck=false] Whether or not to check if the folder exists
 * @returns {Promise<void>}
 */
export async function downloadAndSaveFile(
  url,
  path,
  fileType,
  hash = null,
  algorithm = 'sha1',
  logging = true,
  skipFolderCheck = false
) {
  return new Promise((resolve, reject) => {
    logger.info(`Downloading ${url}...`);

    axios
      .get(url, { responseType: fileType })
      .then(async (response) => {
        if (logging) {
          logger.info(`Downloaded ${url}`);
          logger.debug(`Saving to ${path}...`);
        }

        if (!skipFolderCheck) {
          const folderPath = path.includes('\\')
            ? path.substring(0, path.lastIndexOf('\\'))
            : path.substring(0, path.lastIndexOf('/'));
          await fs.mkdir(folderPath, {
            recursive: true,
          });
        }

        if (fileType === 'text') {
          fs.writeFile(path, response.data, 'utf8').then(async () => {
            if (logging) logger.debug(`Saved to ${path}`);

            if (hash) {
              // eslint-disable-next-line no-unused-vars
              const isMatching = await checkHash(path, hash, algorithm);
              // Handle hash mismatch
            }

            resolve();
          });
        }

        if (fileType === 'blob') {
          const output = createWriteStream(path);
          const ws = new WritableStream(output);

          let blob = new Blob([response.data], { type: 'application/zip' });

          const stream = blob.stream();

          stream.pipeTo(ws).then(async () => {
            if (hash) {
              // eslint-disable-next-line no-unused-vars
              const isMatching = await checkHash(path, hash, algorithm);
              // Handle hash mismatch
            }

            resolve();
          });
        }
      })
      .catch(reject);
  });
}

/**
 * Checks if the given hash is matching with the given file
 * @param {string} path Path of the file to check
 * @param {string} hash Hash to check
 * @param {'sha1'|'sha256'} algorithm Algorithm to use
 * @param {boolean} [logging=true] Whether or not to log
 * @returns {Promise<boolean>}
 */
export async function checkHash(path, hash, algorithm, logging = true) {
  return new Promise((resolve) => {
    if (logging) logger.debug(`Checking hash of ${path}...`);

    fs.readFile(path)
      .then((fileBuffer) => {
        const hashSum = createHash(algorithm);
        hashSum.update(fileBuffer);
        const fileHash = hashSum.digest('hex');
        if (fileHash !== hash) {
          if (logging)
            logger.error(
              `Hash mismatch for ${path}\nExpected: ${hash}\nGot: ${fileHash}\nAlgorithm: ${algorithm}`
            );
          resolve(false);
        } else {
          if (logging) logger.debug(`Hash matches for ${path}`);
          resolve(true);
        }
      })
      .catch((error) => {
        logger.error(`Failed to check hash for ${path}`, error);
        resolve(false);
      });
  });
}
