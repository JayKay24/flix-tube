interface IViewed {
  videoId: string;
}

interface IVideoUploaded {
  id: string;
  name: string;
  url?: string;
}

export type { IViewed, IVideoUploaded };
