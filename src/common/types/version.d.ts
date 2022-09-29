declare namespace Version {
  type Rule = {
    action: 'allow' | 'disallow';
    os?: {
      name?: string;
      arch?: string;
      version?: string;
    };
    features?: {
      is_demo_user: boolean;
      has_custom_resolution: boolean;
    };
  };

  type Library = {
    downloads: {
      artifact: Server.Artifact;
      classifiers?: {
        'natives-linux'?: Server.Artifact;
        'natives-osx'?: Server.Artifact;
        'natives-windows'?: Server.Artifact;
      };
    };
    extract?: {
      exclude: string[];
    };
    natives: {
      linux: string;
      osx: string;
      windows: string;
    };
    name: string;
    rules?: Rule[];
  };

  type Manifest = {
    arguments: {
      game: Array<
        string & {
          value: string | string[];
          rules: Version.Rule[];
        }
      >;
      jvm: Array<
        string & {
          value: string | string[];
          rules: Version.Rule[];
        }
      >;
    };
    assetIndex: {
      id: string;
      sha1: string;
      size: number;
      totalSize: number;
      url: string;
    };
    assets: string;
    downloads: {
      client: Server.Artifact;
      server: Server.Artifact;
    };
    id: string;
    javaVersion: {
      component: Java.Runtimes;
      majorVersion: number;
    };
    libraries: Library[];
    logging: {
      client: {
        argument: string;
        file: {
          id: string;
          sha1: string;
          size: number;
          url: string;
        };
      };
    };
    mainClass: string;
  };

  type AssetIndex = {
    objects: {
      [k: string]: { hash: string; size: number };
    };
  };
}
