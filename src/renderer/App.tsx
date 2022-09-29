import { GlobalStyles } from '@renderer/styles/globalStyles';
import { ThemeProvider } from 'styled-components';

import { Loading } from './components/Loading';
import { TitleBar } from './components/Titlebar';
import { Updater } from './components/Updater';
import { InstancesProvider } from './contexts/InstancesContext';
import { LoadingProvider } from './contexts/LoadingContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { ServersProvider } from './contexts/ServersContext';
import { SessionProvider } from './contexts/SessionContext';
import { RouterComponent } from './router';
import { theme } from './styles/theme';

export const App = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <TitleBar />
    <NotificationProvider>
      <LoadingProvider>
        <SessionProvider>
          <ServersProvider>
            <InstancesProvider>
              <Updater />
              <Loading />
              <RouterComponent />
            </InstancesProvider>
          </ServersProvider>
        </SessionProvider>
      </LoadingProvider>
    </NotificationProvider>
  </ThemeProvider>
);
