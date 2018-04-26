import RemoteHandlebars from 'express-remote-handlebars';

export default class LayoutEngine {
  constructor(layoutUrl) {
    const remoteHandlebars = RemoteHandlebars.create();
    this.layoutUrl = layoutUrl;
    this.engine = remoteHandlebars.engine;
    this.getLayout = remoteHandlebars.getLayout.bind(remoteHandlebars);
  }

  resolveLayout(options) {
    if(!this.layoutUrl) {
      return Promise.resolve();
    }
   
    return new Promise((resolve, reject) => {
      this.getLayout({ headers: options.headers, url: this.layoutUrl }, (err, layout) => {
        if(err) return reject(err);
        resolve(layout);
      });
    });
  }
}
