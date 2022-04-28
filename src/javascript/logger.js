import fs from 'fs/promises';
import { join } from 'path';
import constants from '../constants';

/**
 * Log system used to log messages to the console and to the log file
 */
export default class Logger {
  constructor(name) {
    this.name = name;
    this.logger = console;
  }

  debug(...args) {
    const x = `[${this.name}]`;
    this.logger.debug(x, ...args);
    this.writeLog(`[DEBUG] ${x} ${[...args].join(' ')}`);
  }

  info(...args) {
    const x = `[${this.name}]`;
    this.logger.info(x, ...args);
    this.writeLog(`[INFO] ${x} ${[...args].join(' ')}`);
  }

  warn(...args) {
    const x = `[${this.name}]`;
    this.logger.warn(x, ...args);
    this.writeLog(`[WARN] ${x} ${[...args].join(' ')}`);
  }

  error(...args) {
    const x = `[${this.name}]`;
    this.logger.error(x, ...args);
    this.writeLog(`[ERROR] ${x} ${[...args].join(' ')}`);
  }

  /**
   * Write log to file
   * @param {any} log
   */
  async writeLog(log) {
    await fs.appendFile(
      join(constants.SOLARTWEAKS_DIR, 'logs', 'latest.log'),
      `${log}\n`
    );
  }
}

/**
 * Clears the log file
 */
export async function clearLogs() {
  await fs.writeFile(join(constants.SOLARTWEAKS_DIR, 'logs', 'latest.log'), '');
}
