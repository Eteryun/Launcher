import os from 'os';

export const getPlatform = () => {
  switch (os.platform()) {
    case 'darwin':
      return 'osx';
    case 'win32':
      return 'windows';
    default:
      return 'linux';
  }
};

export const getArch = () => {
  switch (os.arch()) {
    case 'x64':
      return 'x64';
    case 'ia32':
      return 'x84';
    case 'arm64':
      return 'arm64';
    default:
      return 'unknown';
  }
};
