declare namespace Java {
  type Manifest = {
    files: {
      [name: string]: {
        downloads?: {
          raw: Server.Artifact;
        };
        type: 'file' | 'directory';
      };
    };
  };

  type Runtimes =
    | 'java-runtime-alpha'
    | 'java-runtime-beta'
    | 'java-runtime-gamma'
    | 'jre-legacy';
}
