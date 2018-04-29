

class MetaData {
  userName: string;
  directory: string;
}

export class File {
  id: string;
  length: number;
  uploadDate: string;
  filename: string;
  contentType: string;
  metadata: MetaData;
}

