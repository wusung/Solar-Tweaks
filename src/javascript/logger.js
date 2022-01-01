import process from 'process';
import fs from './fs';
import { join } from 'path';

const dotLunarClient =
  process.platform === 'win32'
    ? join(process.env.USERPROFILE, '.lunarclient')
    : join(process.env.HOME, '.lunarclient');

/**
 * Log system used to log messages to the console and to the log file
 */
export default class Logger {
  constructor(name) {
    this.name = name;
    this.logger = console;
    (async () => {
      if (!(await fs.exists(join(dotLunarClient, 'solartweaks'))))
        await fs.mkdir(join(dotLunarClient, 'solartweaks'));
      if (!(await fs.exists(join(dotLunarClient, 'solartweaks', 'logs'))))
        await fs.mkdir(join(dotLunarClient, 'solartweaks', 'logs'));
    })();
  }

  debug(message, ...args) {
    const x = `[${this.name}] ${message}`;
    this.logger.debug(x, ...args);
    this.writeLog(`[DEBUG] ${x}`);
  }

  info(message, ...args) {
    const x = `[${this.name}] ${message}`;
    this.logger.info(x, ...args);
    this.writeLog(`[INFO] ${x}`);
  }

  warn(message, ...args) {
    const x = `[${this.name}] ${message}`;
    this.logger.warn(x, ...args);
    this.writeLog(`[WARN] ${x}`);
  }

  error(message, ...args) {
    const x = `[${this.name}] ${message}`;
    this.logger.error(x, ...args);
    this.writeLog(`[ERROR] ${x}`);
  }

  /**
   * Write log to file
   * @param {any} log
   */
  async writeLog(log) {
    await fs.appendFile(
      join(dotLunarClient, 'solartweaks', 'logs', 'latest.log'),
      `${log}\n`
    );
  }
}

/**
 * Clears the log file
 */
export async function clearLogs() {
  await fs.writeFile(
    join(dotLunarClient, 'solartweaks', 'logs', 'latest.log'),
    ''
  );
}
