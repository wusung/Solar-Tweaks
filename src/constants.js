import { homedir } from 'os';
import { join } from 'path';

export default {
  links: {
    GH_DISCUSSIONS: 'https://github.com/orgs/Solar-Tweaks/discussions',
    GITHUB: 'https://github.com/Solar-Tweaks/',
    YOUTUBE: 'https://www.youtube.com/channel/UCDRSsAqDsCs2GYfvy2xilWw',
    LUNARCLIENT: 'https://lunarclient.com/',
    SERVER_STATUS_ENDPOINT: 'https://mcapi.us/server/status',
    LC_METADATA_ENDPOINT: 'https://api.lunarclientprod.com/launcher/launch',
  },
  API_URL: 'https://server.solartweaks.com/api',
  SOLAR_PATCHER_GITHUB_API:
    'https://api.github.com/repos/Solar-Tweaks/SolarPatcher',
  SOLAR_TWEAKS_GITHUB_API:
    'https://api.github.com/repos/Solar-Tweaks/Solar-Tweaks',
  PATCHER: {
    PATCHER: 'solar-patcher.jar',
    CONFIG: 'config.json',
    UPDATER: 'updater.json',
    CONFIG_EXAMPLE_URL:
      'https://raw.githubusercontent.com/Solar-Tweaks/SolarPatcher/main/config.example.json',
  },
  UPDATERS: {
    INDEX: '/updater/index',
    LAUNCHER: '/updater/?item=launcher&version={version}',
    PATCHER: '/updater/?item=patcher&version={version}',
  },

  DOTLUNARCLIENT: join(homedir(), '.lunarclient'),
};
