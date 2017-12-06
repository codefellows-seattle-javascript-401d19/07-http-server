'use strict';

const urlMod = require('url');
const requestParser = module.exports = {};

requestParser.parse = req => {
  return new Promise((resolve, reject) => {
    req.url = urlMod.parse(req.url, true);
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