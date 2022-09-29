declare namespace Server {
  type Artifact = {
    path?: string;
    sha1: string;
    size: number;
    url: string;
  };

  type File = {
    name: string;
    exclude?: string[];
    artifact: Required<Artifact>;
  };
}
