import assert from 'assert';
import http from 'http';
import config from '../lib/config';
import models from '../lib/models';
import request from 'request';

import '../lib/server/index';

const URL = `http://localhost:${config.port}`;

describe('Get simple page', () => {
  let tests = [
    {'path': '/', statusCode: 404},
    {'path': '/api', statusCode: 200},
    {'path': '/user', statusCode: 404},
    {'path': '/api/user', statusCode: 200},
  ];

  tests.forEach((test) => {
    it(`Get ${test.path} should return ${test.statusCode}`, (done) => {
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
    'manue': { username: 'Manue', password: 'swaga' },
    'noUsername': { password: 'yoloswag' },
    'noPassword': { username: 'Pierre' },
    'noThing': {}
  };

  let bruno = new models.UserSchema(users['bruno']);
  let manue = new models.UserSchema(users['manue']);

  const cleanUp = (done) => models.UserSchema.remove({}, () => done());
  const initUp = (done) => {
    bruno.save()
      .then(() => manue.save())
      .then(() => done())
      .catch((err) => done(err));
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
      {name: 'noUsername', user: users['noUsername'], success: false, message: 'Path `username` is required.'},
      {name: 'noPassword', user: users['noPassword'], success: false, message: 'Path `password` is required.'},
      {name: 'noThing', user: users['noThing'], success: false, message: 'Path `username` is required.'},
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
            assert.equal(test.message, (body.err.errors.username) ? body.err.errors.username.message : body.err.errors.password.message );
          }
          done();
        });
      });
    });
  });

  describe('Get /user - list of all users', () => {
    const options = {
      method: 'GET',
      url: `${URL}/api/user`,
      json: true,
      body: {}
    };

    it('No user', (done) => {
      request(options, (req, res, body) => {
        assert.equal(0, body.response.length);
        done();
      });
    });
    it('2 user', (done) => {
      models.UserSchema.remove({}, (err) => {
        initUp((err) => {
          if (err) done(err);
          else request(options, (req, res, body) => {
            assert.equal(2, body.response.length);
            done();
          });
        });
      });
      // bruno.save().then((results) => {
      //   request(options, (req, res, body) => {
      //     console.log(body);
      //     assert.equal(2, body.response.length);
      //     done();
      //   });
      // }).catch((err) => {
      //   console.log(err);
      //   done(err);
      // });
    });
  });

  describe('Get /user/:id', () => {
    beforeEach(() => initUp);

    const options = {
      method: 'GET',
      url: `${URL}/api/user/`,
      json: true,
      body: {}
    };

    it('Get bruno', (done) => {
      let tmpOptions = options;

      tmpOptions.url += bruno._id;
      // console.log(tmpOptions);
      request(tmpOptions, (req, res, body) => {
        // console.log(body);
        done();
      });
    });
  });
});
