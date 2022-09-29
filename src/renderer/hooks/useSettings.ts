import { useEffect, useState } from 'react';

export const useSettings = () => {
  const [settings, updateSettings] = useState<Launcher.Settings>({
    minMemory: 2,
    maxMemory: 2,
    javaParameters: '',
    basePath: '',
    closeLauncher: true,
    fullScreen: false,
    resolution: {
      width: 0,
      height: 0,
    },
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const data = await window.api.invoke('settings/get');
    updateSettings(data);
  };

  const setSettings = (data: Launcher.Settings) => {
    window.api.send('settings/set', data);
    updateSettings(data);
  };

  return { setSettings, settings };
};
