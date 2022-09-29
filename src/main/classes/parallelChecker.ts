import { StopWatch } from '@common/classes/StopWatch';
import { getFileSha1 } from '@main/utils/file';
import { EventEmitter } from 'events';
import fs from 'fs';

import { Logger } from './logger';
import { Semaphore } from './semaphore';

export class CheckerDownloader extends EventEmitter {
  files: Server.File[];
  invalidFiles: Server.File[];

  totalBytes: number;
  progressBytes: number;

  semaphore?: Semaphore;
  logger: Logger;

  watch: StopWatch;

  constructor(files: Server.File[]) {
    super();
    this.files = files;

    this.totalBytes = this.files.length;
    this.progressBytes = 0;
    this.invalidFiles = [];

    this.logger = Logger.getLogger(`PARALLEL CHECKER`);
    this.watch = new StopWatch();
  }

  start = async (maxParallel = 20) => {
    this.watch.start();
    this.logger.info(
      `Iniciado a verificação, máximo de ${maxParallel} arquivos simultâneos.`,
      `Arquivos na fila: ${this.files.length}`,
    );
    this.semaphore = new Semaphore(maxParallel);
    for (const file of this.files) {
      await this.semaphore?.wait();
      this.checkFile(file);
    }
  };

  private checkFile = (file: Server.File) => {
    if (file.artifact.sha1 !== getFileSha1(file.artifact.path)) {
      this.invalidFiles.push(file);
      if (fs.existsSync(file.artifact.path)) fs.unlinkSync(file.artifact.path);
    }
    this.progressBytes += 1;
    this.progress();
    this.completed();
  };

  abort = () => {
    this.semaphore?.dispose();
    this.watch.restart();
    this.emit('aborted');
  };

  completed = () => {
    this.semaphore?.release();

    if (this.totalBytes === this.progressBytes) {
      this.watch.stop();
      this.logger.info(
        `Verificação finalizado. Tempo de execução: ${this.watch.duration} ms`,
      );
      this.emit('finished', this.invalidFiles);
    }
  };

  progress = () => {
    const progress = this.progressBytes / this.totalBytes;
    this.emit('progress', {
      totalBytes: this.totalBytes,
      progressBytes: this.progressBytes,
      percentage: progress * 100,
    });
  };
}
