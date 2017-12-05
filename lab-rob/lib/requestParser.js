import { request } from 'https';

'use strict';

const urlMod = require('url');
const queryStringMod = require('querystring');
const requestParser = module.exports = {};

requestParser.parse = req => {
  return new Promise((resolve, reject) => {
    req.url = urlMod.parse(req.url);
    req.url.query = queryStringMod.parse(req.url.query);
    if(req.method !== 'POST' && req.method !== 'PUT')
      return resolve(req);
    let sentText = '';
    req.on('data', buffer => {
      sentText += buffer.toString();
    });

    req.on('end', () => {
      try {
        req.body = JSON.parse(sentText);
        return resolve(req);
      } catch(err) {
        return reject(err);
      }
    });
  });
};