import { useEffect } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

import { PrivateRoute } from './components/Route/PrivateRoute';
import { PublicRoute } from './components/Route/PublicRoute';
import { Login } from './pages/Login';
import { Server } from './pages/Server';
import { Servers } from './pages/Servers';
import { Settings } from './pages/Settings';
import { SettingJava } from './pages/Settings/Java';
import { SettingLauncher } from './pages/Settings/Launcher';
import { SettingMinecraft } from './pages/Settings/Minecraft';

const routes = [
  {
    path: '/',
    Component: Login,
    isPublic: true,
  },
  {
    path: '/server',
    Component: Server,
  },
  {
    path: '/servers',
    Component: Servers,
  },
  {
    path: '/settings',
    Component: Settings,
    Childrens: [
      {
        path: 'java',
        Component: SettingJava,
      },
      {
        path: 'launcher',
        Component: SettingLauncher,
      },
      {
        path: 'minecraft',
        Component: SettingMinecraft,
      },
    ],
  },
];

export const RouterComponent = () => (
  <HashRouter>
    <Routes>
      {routes.map(({ path, Component, Childrens, isPublic }) => (
        <Route
          key={path}
          path={path}
          element={
            isPublic ? (
              <PublicRoute Element={<Component />} />
            ) : (
              <PrivateRoute Element={<Component />} />
            )
          }>
          {Childrens &&
            Childrens.map(({ path, Component }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
        </Route>
      ))}
    </Routes>
  </HashRouter>
);
