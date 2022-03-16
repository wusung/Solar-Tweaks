import * as process from 'process';
import { join } from 'path';

export default {
  links: {
    DISCORD: 'https://discord.gg/SolarTweaks',
    GITHUB: 'https://github.com/Solar-Tweaks/',
    YOUTUBE: 'https://www.youtube.com/channel/UCDRSsAqDsCs2GYfvy2xilWw',
    LUNARCLIENT: 'https://lunarclient.com/',
    SERVER_STATUS_ENDPOINT: 'https://mcapi.us/server/status',
    LC_METADATA_ENDPOINT: 'https://api.lunarclientprod.com/launcher/launch',
  },
  API_URL: 'https://api.solartweaks.com/api',
  SOLAR_PATCHER_GITHUB_API:
    'https://api.github.com/repos/Solar-Tweaks/SolarPatcher',
  patcher: {
    PATCHER: 'solar-patcher.jar',
    CONFIG: 'config.json',
    UPDATER: 'updater.json',
  },
  DOTLUNARCLIENT:
    process.platform === 'win32'
      ? join(process.env.USERPROFILE, '.lunarclient')
      : join(process.env.HOME, '.lunarclient'),
};
