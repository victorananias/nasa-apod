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

    if (this.isYoutubeVideo) {
      return this.youtubeSrc;
    }

    if (this.isVimeoVideo) {
      return this.vimeoSrc;
    }

    throw new Error('video thumbnail not found');
  }

  get isVimeoVideo() {
    return this.url.includes('vimeo');
  }

  get isYoutubeVideo() {
    return this.url.includes('youtube');
  }

  get videoSrc() {
    if (this.vimeoSrc) {
      return `${this.url}&title=false&muted=false`;
    }

    return this.url;
  } 

  private get youtubeSrc() {
    const regExp = /embed\/([^)]+)\?/;
    const videoId = regExp.exec(this.url)[1];

    const thumbnailName = 'maxresdefault.jpg';

    return `https://img.youtube.com/vi/${videoId}/${thumbnailName}`;
  }

  private get vimeoSrc() {
    // Not implemented
    return `https://img.youtube.com/vi/null`;
  }

  get isVideo() {
    return this.media_type === 'video';
  }

  get isImage() {
    return this.media_type === 'image';
  }
}
