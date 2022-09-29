import { api } from '@main/bridge';

declare global {
  interface Window {
    api: typeof api;
  }
}
