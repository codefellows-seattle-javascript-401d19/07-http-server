'use strict';

const urlMod = require('url');
const cowsay = require('cowsay');
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
        if(!sentText)
          req.body = {error: 'invalid request: body required'};
        else {
          req.body = JSON.parse(sentText);
          if(!req.body.text)
            req.body = {error: 'invalid request: text required'};
          else
            req.body = {content: cowsay.say({text: req.body.text})};
        }
        return resolve(req);
      } catch(err) {
        req.body = {error: 'Invalid request: object {text: <message>} required'};
        return reject(err);
      }
    });
  });
};

