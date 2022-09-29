import { Checkbox } from '@renderer/components/Input/Checkbox';
import { InputResolution } from '@renderer/components/Input/Resolution';
import { Paragraph } from '@renderer/components/Typography/Paragraph';
import { useSettings } from '@renderer/hooks/useSettings';
import { Fragment } from 'react';

export const SettingMinecraft = () => {
  const { settings, setSettings } = useSettings();

  return (
    <Fragment>
      <section>
        <Paragraph uppercase bold>
          Inicialização
        </Paragraph>
        <Checkbox
          label="Inicializar o jogo em tela cheia"
          color="#fff"
          size="small"
          isChecked={settings.fullScreen}
          onChange={(value) => setSettings({ ...settings, fullScreen: value })}
        />
      </section>
      <section>
        <Paragraph uppercase bold>
          Resolução
        </Paragraph>
        <InputResolution
          resolution={settings.resolution}
          onChange={(value) => setSettings({ ...settings, resolution: value })}
        />
      </section>
    </Fragment>
  );
};
