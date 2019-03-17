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

    if (this.url.includes('vimeo')) {
      return this.vimeoSrc;
    }

    throw new Error('video thumbnail not found');
  }

  private get youtubeSrc() {
    const regExp = /embed\/([^)]+)\?/;
    const videoId = regExp.exec(this.url)[1];

    const thumbnailName = 'maxresdefault.jpg';

    return `https://img.youtube.com/vi/${videoId}/${thumbnailName}`;
  }

  private get vimeoSrc() {
    const regExp = /video\/([^)]+)\?/;
    const videoId = regExp.exec(this.url)[1];
    console.log(videoId);

    const vimeoUrl = `http://vimeo.com/api/v2/video/${videoId}.OUTPUT`;

    return `https://img.youtube.com/vi/null`;
  }

  get isVideo() {
    return this.media_type === 'video';
  }

  get isImage() {
    return this.media_type === 'image';
  }
}
