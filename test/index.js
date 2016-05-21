import assert from 'assert';
import http from 'http';
import config from '../lib/config';

import '../lib/index';

const URL = `http://localhost:${config.port}`;

describe('An example test', () => {
  it('should return 200', (done) => {
    http.get(URL + '/', (res) => {
      assert.equal(200, res.statusCode);
      done();
    });
  });
});
