declare namespace Launcher {
  type Settings = {
    minMemory: number;
    maxMemory: number;
    javaParameters: string;
    basePath: string;
    closeLauncher: boolean;
    fullScreen: boolean;
    resolution: {
      width: number;
      height: number;
    };
  };
}
