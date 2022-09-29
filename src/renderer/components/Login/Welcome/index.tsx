import DiscordIcon from '@renderer/assets/icons/discord.svg';
import WebsiteIcon from '@renderer/assets/icons/website.svg';
import { Heading } from '@renderer/components/Typography/Heading';
import { Paragraph } from '@renderer/components/Typography/Paragraph';

import { Container, Social } from './styles';

export const LoginWelcome = () => (
  <Container>
    <Heading>Bem-Vindo ao Eteryun {`\n`} Faça Login para continuar.</Heading>
    <Paragraph>
      Siga-nos em nossas redes sociais para se manter {`\n`} por dentro de todas
      as novidades!
    </Paragraph>
    <Social>
      <a href="https://eteryun.com.br" target="_blank" rel="noreferrer">
        <DiscordIcon />
      </a>
      <a href="https://eteryun.com.br" target="_blank" rel="noreferrer">
        <WebsiteIcon />
      </a>
    </Social>
  </Container>
);
