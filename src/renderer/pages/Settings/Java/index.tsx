import { Input } from '@renderer/components/Input';
import { InputRange } from '@renderer/components/Input/Range';
import { Paragraph } from '@renderer/components/Typography/Paragraph';
import { useSettings } from '@renderer/hooks/useSettings';
import { Fragment, useEffect, useState } from 'react';
import { useTheme } from 'styled-components';

export const SettingJava = () => {
  const theme = useTheme();
  const { settings, setSettings } = useSettings();
  const [ram, setRam] = useState(2);

  useEffect(() => {
    (async () => {
      const data = await window.api.invoke('os/ram');
      setRam(data);
    })();
  }, []);

  return (
    <Fragment>
      <section>
        <Paragraph uppercase bold>
          Memória
        </Paragraph>
        <Paragraph color={theme.colors.gray} size="small">
          Ram Disponível:{' '}
          <span style={{ color: '#72efba' }}>{ram.toFixed(1)} GB</span>
        </Paragraph>
        <InputRange
          title="Ram Máxima"
          suffix="GB"
          min={2}
          max={ram}
          step={0.1}
          value={settings.maxMemory}
          onChange={(value) =>
            setSettings({
              ...settings,
              maxMemory: value,
              minMemory:
                value < settings.minMemory ? value : settings.minMemory,
            })
          }
        />
        <InputRange
          title="Ram Mínina"
          suffix="GB"
          min={2}
          max={ram}
          step={0.1}
          value={settings.minMemory}
          onChange={(value) =>
            setSettings({
              ...settings,
              minMemory: value,
              maxMemory:
                value > settings.maxMemory ? value : settings.maxMemory,
            })
          }
        />
      </section>
      <section>
        <Paragraph uppercase bold>
          Argumentos
        </Paragraph>
        <Input
          title="Argumento JVM"
          placeHolder="-XX:+UnlockExperimentalVMOptions -XX:+UseG1GC -XX:G1NewSizePercent=20 -XX:G1ReservePercent=20 -XX:MaxGCPauseMillis=50 -XX:G1HeapRegionSize=32M"
          value={settings.javaParameters}
          onChange={(value) =>
            setSettings({ ...settings, javaParameters: value })
          }
        />
      </section>
    </Fragment>
  );
};
