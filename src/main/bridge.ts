/* eslint-disable @typescript-eslint/no-explicit-any */
import { ipcRenderer } from 'electron';

export const api = {
  send: ipcRenderer.send,
  invoke: ipcRenderer.invoke,
  on: (channel: string, callback: (...args: any[]) => unknown) => {
    ipcRenderer.on(channel, (_, ...data) => callback(...data));
  },
  once: (channel: string, callback: (...args: any[]) => unknown) => {
    ipcRenderer.once(channel, (_, ...data) => callback(...data));
  },
  addListener: (channel: string, callback: (...args: any[]) => unknown) => {
    ipcRenderer.addListener(channel, (_, ...data) => callback(...data));
  },
  removeListener: (channel: string, callback: (...args: any[]) => unknown) => {
    ipcRenderer.removeListener(channel, (_, ...data) => callback(...data));
  },
  removeAllListener: (channel: string) => {
    ipcRenderer.removeAllListeners(channel);
  },
};

window.api = api;
