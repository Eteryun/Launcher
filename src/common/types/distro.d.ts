declare namespace Distro {
  type Server = {
    id: string;
    name: string;
    title: string;
    description: string;
    icon: string;
    version: string;
    minecraft: {
      version: string;
      address: string;
    };
    client: {
      manifest: Server.Artifact;
    };
    libraries: Version.Library[];
    files: Server.File[];
  };
}
