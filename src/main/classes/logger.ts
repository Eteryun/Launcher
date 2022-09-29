import dayjs from 'dayjs';
import { app } from 'electron';
import fs from 'fs';
import path from 'path';

export class Logger {
  private static logPath = path.join(
    app.getPath('userData'),
    'launcher_logs.txt',
  );

  private levelsColor = {
    info: '\x1b[32m',
    error: '\x1b[31m',
    warn: '\x1b[33m',
    debug: '\x1b[36m',
  };

  private name: string;

  private constructor(name: string) {
    if (fs.existsSync(Logger.logPath)) fs.unlinkSync(Logger.logPath);

    this.name = name;
  }

  public static getLogger(name: string) {
    return new Logger(name);
  }

  error = (...args: unknown[]): void => {
    this.print('error', ...args);
  };

  warn = (...args: unknown[]): void => {
    this.print('warn', ...args);
  };

  info = (...args: unknown[]): void => {
    this.print('info', ...args);
  };

  debug = (...args: unknown[]): void => {
    this.print('debug', ...args);
  };

  private print = (
    level: 'info' | 'error' | 'warn' | 'debug',
    ...args: unknown[]
  ) => {
    const message = `[${dayjs().format(
      'hh:mm:ss',
    )}] [${level.toUpperCase()}] [${this.name}] ${args.join(' ')}`;

    if (process.env.NODE_ENV === 'development')
      console[level](`${this.levelsColor[level]}${message}\x1b[0m`);

    fs.appendFileSync(Logger.logPath, `${message}\n`);
  };
}
