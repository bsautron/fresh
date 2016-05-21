import express from 'express';
import config from './config/index';

let app = express()
  .get('/', (req, res) => res.end('hello men'))
  .get('/coucou', (req, res) => res.end('Hey!! what\'s up'))
  .listen(config.port);
