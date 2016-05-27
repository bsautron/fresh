import config from '../config';

export class StructResponseApi {
  constructor() {
    this.response = {
      infos: {
        name: config.name,
        version: config.version,
        date: new Date()
      }
    };
  }

  success(data) {
    this.response['success'] = true;
    this.response['response'] = data;
    return this.response;
  }

  fail(err) {
    this.response['success'] = false;
    this.response['err'] = err;
    return this.response;
  }
}

export default (err, data) => {
  if (err) return new StructResponseApi().fail(err);
  else return new StructResponseApi().success(data);
}
