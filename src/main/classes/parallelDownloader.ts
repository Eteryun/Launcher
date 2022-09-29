import { StopWatch } from '@common/classes/StopWatch';
import { EventEmitter } from 'events';

import { Downloader } from './downloader';
import { Logger } from './logger';
import { Semaphore } from './semaphore';

export class ParallelDownloader extends EventEmitter {
  files: Server.File[];
  currentDownloads: Downloader[];

  totalBytes: number;
  progressBytes: number;

  semaphore?: Semaphore;

  countDownloaded: number;
  logger: Logger;

  watch: StopWatch;

  constructor(files: Server.File[]) {
    super();
    this.files = files;
    this.currentDownloads = [];

    this.totalBytes = this.files.reduce((a, b) => a + b.artifact.size, 0);
    this.progressBytes = 0;
    this.countDownloaded = 0;

    this.logger = Logger.getLogger(`PARALLEL DOWNLOADER`);
    this.watch = new StopWatch();
  }

  start = async (maxParallel = 20) => {
    this.watch.start();
    this.logger.info(
      `Iniciado o download, máximo de ${maxParallel} arquivos simultâneos.`,
      `Arquivos na fila: ${this.files.length}`,
    );
    this.semaphore = new Semaphore(maxParallel);
    for (const file of this.files) {
      await this.semaphore?.wait();
      this.downloadFile(file);
    }
  };

  private downloadFile = (file: Server.File) => {
    const downloader = new Downloader(
      file.artifact.url,
      file.artifact.path,
      file.artifact.size,
    );

    downloader.on('finished', () => this.completed(downloader));
    downloader.on('error', (error: Error) => this.error(file, error));
    downloader.on('progress', this.progress);

    this.currentDownloads.push(downloader);
    downloader.start();
  };

  pause = () => {
    this.semaphore?.pause();
    this.watch.stop();
    this.currentDownloads.forEach((downloader) => downloader.pause());
  };

  resume = () => {
    this.semaphore?.resume();
    this.watch.start();
    this.currentDownloads.forEach((downloader) => downloader.resume());
  };

  abort = () => {
    this.semaphore?.dispose();
    this.watch.restart();
    this.currentDownloads.forEach((downloader) => downloader.stop());
  };

  completed = (downloader: Downloader) => {
    this.semaphore?.release();
    this.currentDownloads = this.currentDownloads.filter(
      (currentDownload) => currentDownload === downloader,
    );
    this.countDownloaded += 1;

    if (this.countDownloaded === this.files.length) {
      this.watch.stop();
      this.logger.info(
        `Download finalizado. Tempo de execução: ${this.watch.duration} ms`,
      );
      this.emit('finished');
    }
  };

  progress = ({ bytesRead }: { bytesRead: number }) => {
    this.progressBytes += bytesRead;
    const progress = this.progressBytes / this.totalBytes;
    this.emit('progress', {
      totalBytes: this.totalBytes,
      progressBytes: this.progressBytes,
      percentage: progress * 100,
    });
  };

  error = (file: Server.File, error: Error) => {
    this.semaphore?.dispose();
    this.emit('error', {
      file,
      error,
    });
  };
}
