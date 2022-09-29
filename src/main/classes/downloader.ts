import { EventEmitter } from 'events';
import fs from 'fs';
import http, { ClientRequest, IncomingMessage } from 'http';
import https from 'https';
import path from 'path';

export class Downloader extends EventEmitter {
  source: string;
  destination: string;

  contentLength: number;
  bytesWritten: number;

  http: typeof import('https') | typeof import('http');

  request?: ClientRequest;
  response?: IncomingMessage;

  aborted?: boolean;

  constructor(source: string, destination: string, expectedSize: number) {
    super();
    this.source = source;
    this.destination = destination;
    this.bytesWritten = 0;

    this.http = source.startsWith('http://') ? http : https;
    this.contentLength = expectedSize;
  }

  start = () => {
    fs.mkdirSync(path.dirname(this.destination), { recursive: true });
    const file = fs.createWriteStream(this.destination);

    this.request = this.http.get(this.source, (response) => {
      this.response = response;

      if (response.statusCode != 200) {
        this.stop();
        this.emit('error', new Error(response.statusMessage));
        file.close();
        fs.unlinkSync(this.destination);
        return;
      }

      this.contentLength = parseInt(
        response.headers['content-length'] ?? this.contentLength.toString(),
      );

      response.pipe(file);

      response.on('data', (chunk) => {
        this.bytesWritten += chunk.length;
        this.emit('progress', {
          contentLength: this.contentLength,
          bytesRead: chunk.length,
          bytesWritten: this.bytesWritten,
          progress: (this.bytesWritten / this.contentLength) * 100,
        });
      });

      response.on('error', (error) => {
        this.emit('error', error);
        file.close();
        fs.unlinkSync(this.destination);
      });

      response.on('end', () => {
        if (!this.aborted) this.emit('finished');
      });
    });

    this.request.on('error', (error) => {
      if (this.aborted) this.emit('error', new Error('ABORTED'));
      else this.emit('error', error);
      file.close();
      fs.unlinkSync(this.destination);
    });
  };

  pause = () => {
    this.response?.pause();
  };

  resume = () => {
    this.response?.resume();
  };

  stop = () => {
    if (this.aborted) return;
    this.request?.destroy();
    this.aborted = true;
  };
}
