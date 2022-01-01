import fs from './fs';
import process from 'process';
import { join } from 'path';
import { fetchMetadata, getJavaArguments } from './minecraft';
import settings from 'electron-settings';
import Logger from './logger';
import { exec } from 'child_process';
import { remote } from 'electron';
import store from '../store';

const logger = new Logger('shortcut');

const dotLunarClient =
  process.platform === 'win32'
    ? join(process.env.USERPROFILE, '.lunarclient')
    : join(process.env.HOME, '.lunarclient');

/**
 * Creates the wrapper
 * @param {string} version Minecraft version
 * @param {string} [serverIp=null] The server IP to connect to
 * @returns {Promise<void>}
 */
export async function createShortcutWrapper(version, serverIp = null) {
  if (!(await fs.exists(join(dotLunarClient, 'solartweaks', 'wrappers'))))
    await fs.mkdir(join(dotLunarClient, 'solartweaks', 'wrappers'));

  let wrapper = `wrapper-${version}-${serverIp}.`;
  if (process.platform === 'win32') wrapper += 'cmd';
  else wrapper += 'sh';

  const versionFolder = join(dotLunarClient, 'offline', version);

  const wrapperFile = join(dotLunarClient, 'solartweaks', 'wrappers', wrapper);
  if (await fs.exists(wrapperFile)) {
    logger.debug('Wrapper already exists');
    return [wrapperFile, versionFolder];
  }

  let wrapperData = process.platform !== 'win32' ? '#!/bin/sh\n' : '';

  const metadata = await fetchMetadata(true);
  const args = await getJavaArguments(metadata, serverIp, version);

  wrapperData += `cd "${versionFolder}"\n`;
  wrapperData += process.platform === 'win32' ? 'start "" ' : '';

  wrapperData += `"${join(await settings.get('jrePath'), 'javaw')}" ${args.join(
    ' '
  )}`;

  await fs.writeFile(wrapperFile, wrapperData, 'utf8');
  logger.debug('Wrapper created');

  await fs.chmod(wrapperFile, 0o755);

  return [wrapperFile, versionFolder];
}

/**
 * Creates the actual shortcut on the desktop
 * @param {string} shortcutName Name of the shortcut to create
 * @param {string} version Minecraft version
 * @param {string} [serverIp=null] The server IP to connect to
 * @returns {Promise<void>}
 */

export async function createShortcut(shortcutName, version, serverIp = null) {
  if (process.platform !== 'win32') {
    remote.dialog.showMessageBox({
      type: 'error',
      title: "Can't create shortcut",
      message:
        'This feature is only available on Windows\nSorry for the inconvenience, shortcuts for other OS are going to be added soon',
    });
    return;
  }

  const [wrapper, versionFolder] = await createShortcutWrapper(
    version,
    serverIp
  );

  const command = [
    '$WshShell = New-Object -comObject WScript.Shell',
    `$Shortcut = $WshShell.CreateShortcut([System.Environment]::GetFolderPath(\\"Desktop\\") + \\"\\\\${shortcutName}.lnk\\")`,
    `$Shortcut.TargetPath = \\"${wrapper}\\"`,
    `$Shortcut.WorkingDirectory = \\"${versionFolder}\\"`,
    `$Shortcut.WindowStyle = 7`,
    '$Shortcut.Save()',
  ];

  const powershell = exec(
    `powershell.exe -nop -command "${command.join('; ')}"`
  );

  powershell.on('close', (code) => {
    if (code === 0) {
      logger.info('Shortcut created');
      store.state.isCreatingShortcut = !store.state.isCreatingShortcut;
      remote.dialog.showMessageBox({
        type: 'info',
        title: 'Shortcut created',
        message: 'Your shortcut has been created on your desktop!',
      });
    } else {
      logger.error('Shortcut creation failed');
    }
  });
}
