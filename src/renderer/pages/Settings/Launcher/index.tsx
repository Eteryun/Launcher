import { Checkbox } from '@renderer/components/Input/Checkbox';
import { InputFolder } from '@renderer/components/Input/Folder';
import { Paragraph } from '@renderer/components/Typography/Paragraph';
import { useSettings } from '@renderer/hooks/useSettings';
import { Fragment } from 'react';

export const SettingLauncher = () => {
  const { settings, setSettings } = useSettings();

  return (
    <Fragment>
      <section>
        <Paragraph uppercase bold>
          Inicialização
        </Paragraph>
        <Checkbox
          label="Manter o launcher aberto ao executar o jogo"
          color="#fff"
          size="small"
          isChecked={!settings.closeLauncher}
          onChange={(value: boolean) =>
            setSettings({ ...settings, closeLauncher: !value })
          }
        />
      </section>
      <section>
        <Paragraph uppercase bold>
          Pastas
        </Paragraph>
        <InputFolder
          title="Diretório de dados"
          value={settings.basePath}
          onChange={(value) => setSettings({ ...settings, basePath: value })}
        />
      </section>
    </Fragment>
  );
};
