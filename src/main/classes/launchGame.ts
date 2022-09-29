import { getLibrariesFromServer } from '@main/utils/file';
import { getJavaExecutable, getRuntimePlatform } from '@main/utils/java';
import {
  checkRules,
  getNativeArtifact,
  parseArtifactPath,
} from '@main/utils/library';
import { getPlatform } from '@main/utils/os';
import {
  assetsPath,
  getLogConfigFilePath,
  getVersionJarPath,
  instancesPath,
  libraryPath,
  runtimePath,
} from '@main/utils/path';
import { getSettings } from '@main/utils/settings';
import { getManifestFromArtifact } from '@main/utils/version';
import childProcess from 'child_process';
import { app } from 'electron';
import fs from 'fs';
import path from 'path';

import { Logger } from './logger';
import { Natives } from './natives';

const logger = Logger.getLogger('MINECRAFT');

export class LaunchGame {
  private server: Distro.Server;
  private session: Auth.Session;
  private defaultJavaParameter = [
    '-XX:+UnlockExperimentalVMOptions',
    '-XX:+UseG1GC',
    '-XX:G1NewSizePercent=20',
    '-XX:G1ReservePercent=20',
    '-XX:MaxGCPauseMillis=50',
    '-XX:G1HeapRegionSize=32M',
  ];

  constructor(server: Distro.Server, session: Auth.Session) {
    this.server = server;
    this.session = session;
  }

  getProgress = async () => {
    const workingDirectory = path.join(instancesPath, this.server.id);
    fs.mkdirSync(workingDirectory, { recursive: true });

    const manifest = await getManifestFromArtifact(this.server);

    const args = await this.parseArgs(manifest);
    const javaPath = this.getJavaPath(manifest.javaVersion.component);

    logger.debug(
      'Iniciando jogo',
      `\nDiretorio: ${workingDirectory}`,
      `\nJava: ${javaPath}`,
      `\nArgumentos: ${args}`,
    );

    const child = childProcess.spawn(javaPath, args, {
      cwd: workingDirectory,
      detached: true,
    });

    child.stdout.setEncoding('utf8');
    child.stderr.setEncoding('utf8');

    return child;
  };

  private getJavaPath = (component: string) => {
    return path.join(
      runtimePath,
      component,
      getRuntimePlatform(),
      getJavaExecutable(),
    );
  };

  private createClassPath = async (manifest: Version.Manifest) => {
    const libraries = await getLibrariesFromServer(this.server);

    const clientPath = getVersionJarPath(manifest.id);

    const classPath = libraries
      .filter((library) => !getNativeArtifact(library))
      .map((library) =>
        parseArtifactPath(
          library.name,
          getNativeArtifact(library) || library.downloads.artifact,
        ),
      );
    classPath.push(clientPath);

    return classPath.join(getPlatform() === 'windows' ? ';' : ':');
  };

  private createNativePath = () => {
    const native = new Natives(this.server);
    native.cleanNatives();
    return native.extractNatives();
  };

  private parseArgs = async (manifest: Version.Manifest) => {
    const classPath = await this.createClassPath(manifest);
    const nativePath = await this.createNativePath();
    const settings = getSettings();

    const argRegex = /\${*(.*)}/;

    const argsDict: { [k: string]: string } = {
      library_directory: libraryPath,
      natives_directory: nativePath,
      launcher_name: app.name,
      launcher_version: app.getVersion(),
      classpath_separator: getPlatform() === 'windows' ? ';' : ':',
      classpath: classPath,
      auth_player_name: this.session.name,
      version_name: this.server.id,
      game_directory: path.join(instancesPath, this.server.id),
      assets_root: assetsPath,
      assets_index_name: manifest.assetIndex.id,
      auth_uuid: this.session.id,
      auth_access_token: this.session.accessToken,
      user_type: 'msa',
      version_type: 'release',
      resolution_width: String(settings.resolution.width),
      resolution_height: String(settings.resolution.height),
      path: getLogConfigFilePath(manifest.logging.client.file.id),
    };

    const args: string[] = this.parseArgArray(manifest.arguments.jvm);
    if (settings.javaParameters)
      args.push(...settings.javaParameters.split(' '));
    if (settings.maxMemory > 0) args.push(`-Xmx${settings.maxMemory}G`);
    if (settings.minMemory > 0) args.push(`-Xms${settings.minMemory}G`);

    args.push(...this.defaultJavaParameter);
    args.push(manifest.logging.client.argument);
    args.push(manifest.mainClass);
    args.push(...this.parseArgArray(manifest.arguments.game));
    if (settings.fullScreen) args.push('--fullscreen');

    for (let i = 0; i < args.length; i++) {
      const arg = args[i];
      const match = arg.match(argRegex);
      if (argRegex.test(arg) && match) {
        const id = match[1];
        const value: string = argsDict[id];
        if (value) args[i] = arg.replace(argRegex, value);
      }
    }

    return args;
  };

  parseArgArray = (args: string[]) => {
    const parsedArgs: string[] = [];
    for (const arg of args) {
      if (typeof arg === 'string') {
        parsedArgs.push(arg);
      } else {
        const obj = arg as {
          value: string | string[];
          rules: Version.Rule[];
        };

        if (checkRules(obj.rules)) {
          typeof obj.value === 'string'
            ? parsedArgs.push(obj.value as string)
            : parsedArgs.push(...obj.value);
        }
      }
    }

    return parsedArgs;
  };
}
