export class Media {
  copyright: string;
  date: string;
  explanation: string;
  hdurl: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;

  constructor(media) {
    this.copyright = media.copyright || null;
    this.date = media.date || null;
    this.explanation = media.explanation || null;
    this.hdurl = media.hdurl || null;
    this.media_type = media.media_type || null;
    this.service_version = media.service_version || null;
    this.title = media.title || null;
    this.url = media.url || null;
  }

  get src() {
    if (this.media_type === 'image') {
      return this.url;
    }

    const regExp = /embed\/([^)]+)\?/;

    const matches = regExp.exec(this.url);
    // const matches = regExp.exec('https://www.youtube.com/embed/B1R3dTdcpSU?rel=0');

    const videoId = matches[1];
    const thumbnailName = 'maxresdefault.jpg';

    return `https://img.youtube.com/vi/${videoId}/${thumbnailName}`;
  }
}
