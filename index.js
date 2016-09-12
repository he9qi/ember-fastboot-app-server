"use strict";

const FastBootAppServer = require('fastboot-app-server');
const S3Downloader = require('fastboot-s3-downloader');
const RedisCache = require('fastboot-redis-cache');
const S3Notifier = require('fastboot-s3-notifier');

const REDIS_HOST   = process.env.FASTBOOT_REDIS_HOST;
const REDIS_PORT   = process.env.FASTBOOT_REDIS_PORT;
const REDIS_EXPIRY = process.env.FASTBOOT_REDIS_EXPIRY;

const S3_PARAMS = {
  bucket: process.env.FASTBOOT_S3_BUCKET,
  key: process.env.FASTBOOT_DEPLOY_INFO
};

const downloader = new S3Downloader(S3_PARAMS);
const notifier = new S3Notifier(S3_PARAMS);

let cache;
if (REDIS_HOST || REDIS_PORT) {
  cache = new RedisCache({
    host: REDIS_HOST,
    port: REDIS_PORT,
    expiration: REDIS_EXPIRY
  });
} else {
  console.log('No FASTBOOT_REDIS_HOST or FASTBOOT_REDIS_PORT provided; caching is disabled.');
}

const server = new FastBootAppServer({
  downloader: downloader,
  notifier: notifier,
  cache: cache
});

server.start();
