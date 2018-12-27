export class Media {
  copyright: string;
  date: string;
  explanation: string;
  hdurl: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;

  constructor(media = {}) {
    if (media) {
      Object.assign(this, media);
    }
  }

  get src() {
    if (this.media_type === 'image') {
      return this.url;
    }

    if (this.url.includes('youtube')) {
      return this.youtubeSrc;
    }

    return null;
  }

  private get youtubeSrc() {
    const regExp = /embed\/([^)]+)\?/;
    const videoId = regExp.exec(this.url)[1];

    const thumbnailName = 'maxresdefault.jpg';

    return `https://img.youtube.com/vi/${videoId}/${thumbnailName}`;
  }
}
