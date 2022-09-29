export class Semaphore {
  private permits: number;
  private promiseResolverQueue: Array<(v: boolean) => void> = [];
  private promisePauseQueue: Array<() => void> = [];
  private disposed: boolean;
  private paused: boolean;

  constructor(permits: number) {
    this.permits = permits;
    this.disposed = false;
    this.paused = false;
  }

  wait = async (): Promise<boolean> => {
    if (this.disposed) return false;
    if (this.permits > 0 && !this.paused) {
      this.permits -= 1;
      return Promise.resolve(true);
    }

    return new Promise<boolean>((resolver) =>
      this.promiseResolverQueue.push(resolver),
    );
  };

  release = () => {
    if (this.disposed) return;

    if (this.paused) {
      return this.promisePauseQueue.push(this.release);
    }

    this.permits += 1;

    if (this.permits === 1 && this.promiseResolverQueue.length > 0) {
      this.permits -= 1;

      const nextResolver = this.promiseResolverQueue.shift();
      if (nextResolver) {
        nextResolver(true);
      }
    }
  };

  pause = () => {
    this.paused = true;
  };

  resume = () => {
    this.paused = false;

    for (const promise of this.promisePauseQueue) promise();
  };

  dispose = () => {
    this.disposed = true;
    this.promiseResolverQueue.length = 0;
    this.permits = 0;
  };
}
