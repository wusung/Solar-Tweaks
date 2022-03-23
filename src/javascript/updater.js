import axios from 'axios';
import { join } from 'path';
import constants from '../constants';
import { downloadAndSaveFile } from './downloader';
import fs from 'fs/promises';

import Logger from './logger';
const logger = new Logger('updater');

/**
 * Checks for updates from the github repository
 */
export async function checkForUpdates() {
  logger.info('Checking for updates...');
  const release = await axios
    .get(`${constants.SOLAR_TWEAKS_GITHUB_API}/releases?per_page=1`)
    .catch((reason) => {
      logger.error('Failed to fetch latest solar tweaks release', reason);
    });

  if (!release) return logger.warn('No valid release found!');

  const updaterFile = release.data[0].assets.find(
    (asset) => asset.name === constants.launcher.UPDATER
  );

  if (!updaterFile)
    return logger.warn('No valid updater file found in release!');

  await downloadAndSaveFile(
    updaterFile.browser_download_url,
    join(constants.DOTLUNARCLIENT, 'solartweaks', 'updater-launcher.json'),
    'blob'
  ).catch((reason) => {
    logger.error('Failed to download launcher updater file', reason);
  });

  await fs
    .readFile(
      join(constants.DOTLUNARCLIENT, 'solartweaks', 'updater-launcher.json')
    )
    .catch((reason) => {
      logger.error('Failed to read launcher updater file', reason);
    });
}
