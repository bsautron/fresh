import assert from 'assert';
import http from 'http';
import config from '../lib/config';
import models from '../lib/models';
import request from 'request';

import '../lib/server/index';

const URL = `http://localhost:${config.port}`;

describe('GET simple page', () => {
  let tests = [
    {'path': '/', statusCode: 404},
    {'path': '/api', statusCode: 200},
    {'path': '/user', statusCode: 404},
    {'path': '/api/user', statusCode: 200},
  ];

  tests.forEach((test) => {
    it(`GET ${test.path} should return ${test.statusCode}`, (done) => {
      let options = {
        method: 'GET',
        url: `${URL}${test.path}`,
        json: true
      };
      request(options, (err, res, body) => {
        if (res.statusCode == 200)
          assert.strictEqual(true, body.success);
        assert.equal(test.statusCode, res.statusCode);
        done();
      });
    });
  });
});

describe('Test bdd', () => {

  let users = {
    'bruno': { username: 'Bruno', password: 'yoloswag', email: 'sautron.brunojj@gmail.com' },
    'manue': { username: 'Manue', password: 'swaga', email: 'manue.termeau@gmail.com' },
    'noUsername': { password: 'yoloswag', email: 'yolo@swag.org' },
    'noPassword': { username: 'Pierre', email: 'pierreiatre@hotmail.com'},
    'noEmail': { username: 'good', password: 'goodtoo'},
    'noThing': {}
  };



  const cleanUp = (done) => models.UserSchema.remove({}, () => done());
  const initUp = (done) => {
    let bruno = models.UserSchema(users['bruno']);
    let manue = models.UserSchema(users['manue']);
    bruno.save()
      .then(() => manue.save())
      .then(() => done({bruno, manue}))
      .catch((err) => done({err}));
    };

  beforeEach(cleanUp);

  describe('Signup User', () => {

    const options = {
      method: 'POST',
      url: `${URL}/api/signup`,
      json: true,
      body: {}
    };

    let tests = [
      {name: 'bruno', user: users['bruno'], success: true, role: 'client'},
      {name: 'manue', user: users['manue'], success: true, role: 'client'},
      {name: 'noUsername', user: users['noUsername'], success: false, code: 1002},
      {name: 'noPassword', user: users['noPassword'], success: false, code: 1003},
      {name: 'noEmail', user: users['noEmail'], success: false, code: 1004},
      {name: 'noThing', user: users['noThing'], success: false, code: 1004},
    ];

    tests.forEach((test) => {
      it(`Add ${test.name} (${(test.success) ? 'good' : 'bad'} user)`, (done) => {
        let tmpOptions = options;

        tmpOptions.body = test.user;
        request(tmpOptions, (req, res, body) => {
          if (test.success) {
            assert.strictEqual(true, body.success);
            assert.strictEqual(test.user.username.toLowerCase(), body.response.username);
            assert.strictEqual(test.role, body.response.role);
          } else {
            assert.strictEqual(false, body.success);
            assert.strictEqual(test.code, body.err.code);
          }
          done();
        });
      });
    });
  });

  describe('GET /user - list of all users', () => {
    const options = {
      method: 'GET',
      url: `${URL}/api/user`,
      json: true,
      body: {}
    };

    it('No user', (done) => {
      request(options, (req, res, body) => {
        assert.equal(0, Object.keys(body.response).length);
        done();
      });
    });
    it('2 user', (done) => {
      models.UserSchema.remove({}, (err) => {
        initUp(({err}) => {
          if (err) done(err);
          else request(options, (req, res, body) => {
            assert.equal(2, Object.keys(body.response).length);
            done();
          });
        });
      });
    });
  });

  describe('GET /user/:id', () => {
    let tests = [
      {success: true, name: 'bruno'},
      {success: true, name: 'manue'},
      {success: false, name: 'bad id', id: '345345'},
      {success: false, name: 'bad id2', id: 'sgs3ergse5r'},
    ];

    for (let test of tests) {
      it(`GET ${test.name}`, (done) => {
        initUp((user) => {
          let options = {
            method: 'GET',
            url: `${URL}/api/user/`,
            json: true,
            body: {}
          };

          options.url += (test.id) ? test.id : user[test.name]._id;
          request(options, (req, res, body) => {
            if (test.success) {
              assert.strictEqual(true, body.success);
              assert.strictEqual(test.name, body.response.username);
            } else {
              assert.strictEqual(false, body.success);
              assert.strictEqual(1100, body.err.code);
            }
            done();
          });
        });

      });
    }

  });

  describe('DELETE /user/:id', () => {
    let tests = [
      {success: true, name: 'bruno'},
      {success: true, name: 'manue'},
      {success: false, name: 'bad id', id: '345345'},
      {success: false, name: 'bad id2', id: 'sgs3ergse5r'},
    ];

    for (let test of tests) {
      it(`DELETE ${test.name}`, (done) => {
        initUp((user) => {
          let options = {
            method: 'DELETE',
            url: `${URL}/api/user/`,
            json: true,
            body: {}
          };

          options.url += (test.id) ? test.id : user[test.name]._id;
          request(options, (req, res, body) => {
            if (test.success) {
              assert.strictEqual(true, body.success);
            } else {
              assert.strictEqual(false, body.success);
              assert.strictEqual(1100, body.err.code);
            }
            done();
          });
        });

      });
    }

  });
});
