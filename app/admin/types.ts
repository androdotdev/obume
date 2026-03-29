export interface Work {
  id: number;
  category: string;
  cloudinaryUrl: string | null;
}

export interface UploadedFile {
  url: string;
  publicId: string;
}
