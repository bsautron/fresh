import config from '../config';

const ERRORS = {
  // 1000 <= user_code < 2000
  1000: {text: 'username already exist', description: 'You should find an other username'},
  1001: {text: 'email already register', description: 'Please use an other email'},
  1002: {text: '`username` field empty', description: 'You should have a username'},
  1003: {text: '`password` field empty', description: 'You should have a password'},
  1004: {text: '`email` field empty', description: 'You should have a email'},
  1005: {text: 'email not valid', description: 'You should use a valid email'},

  1100: {text: 'User not found', description: 'This `id` is not in the ddb'},
};

export class StructResponseApi {
  constructor() {
    this.infos = {
      name: config.name,
      version: config.version,
      date: new Date()
    };
  }

  success(data) {
    let response = {};

    response['infos'] = this.infos;
    response['success'] = true;
    response['response'] = data;
    return response;
  }

  fail(code) {
    let response = {};
    let error = {};

    if (ERRORS[code]) {
      error = ERRORS[code];
      error.code = code;
    }
    else {
      error = {text: 'Unknow error', description: 'Unknow description - What happended'};
      error.code = code;
    }
    response['infos'] = this.infos;
    response['success'] = false;
    response['err'] = error;
    return response;
  }
}

export default {
  success: (data) => new StructResponseApi().success(data),
  fail: (code) => new StructResponseApi().fail(code)
};
