export class StopWatch {
  private startTime = 0;
  private endTime = 0;
  isRunning = false;
  duration = 0;

  start = () => {
    if (this.isRunning) return;
    this.isRunning = true;
    this.startTime = Date.now();
  };

  stop = () => {
    if (!this.isRunning) return;
    this.isRunning = false;
    this.endTime = Date.now();
    const milliseconds = this.endTime - this.startTime;
    this.duration += milliseconds;
  };

  restart = () => {
    this.startTime = this.endTime = 0;
    this.isRunning = false;
    this.duration = 0;
  };
}
