import { Client } from 'discord-rpc';
import Logger from './logger';
const logger = new Logger('discord');

const clientId = '920998351430901790';

export const client = new Client({ transport: 'ipc' });

client.on('ready', async () => {
  logger.info('Discord RPC ready');
  await updateActivity('In the launcher');
});

/**
 * Establish connection to Discord RPC
 */
export function login() {
  client
    .login({ clientId })
    .then((client) => {
      if (client) {
        logger.info(`Authed for user ${client.user.username}`);
      } else console.error('Failed to login to Discord RPC');
    })
    .catch((error) => {
      logger.error(error);
    });
}

/**
 * Update the current Discord activity
 * @param {string} details The details of the activity
 * @param {string} [state=undefined] The state of the activity
 * @param {Date|number} [timestamp=null] The start timestamp of the activity
 * @param {'elasped'|'remaining'} [mode=null] Display style for the timestamp
 */
export async function updateActivity(
  details,
  state = undefined,
  timestamp = null,
  mode = null
) {
  logger.info('Updating Discord activity');
  const activity = {
    details,
    state,
    largeImageKey: 'logo',
    largeImageText: 'Solar Tweaks 4.0.0-dev',
  };

  if (timestamp && mode) {
    if (mode === 'remaining') {
      activity.startTimestamp = new Date();
      activity.endTimestamp = timestamp;
    } else {
      activity.startTimestamp = timestamp;
    }
  }

  client.setActivity(activity).catch((error) => {
    logger.error(error);
  });
}
