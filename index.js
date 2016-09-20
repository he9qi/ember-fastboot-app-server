"use strict";
const AWS  = require('aws-sdk');
const FastBootAppServer = require('fastboot-app-server');
const S3Downloader = require('fastboot-s3-downloader');
const RedisCache = require('fastboot-redis-cache');
const S3Notifier = require('fastboot-s3-notifier');

const REDIS_HOST   = process.env.FASTBOOT_REDIS_HOST;
const REDIS_PORT   = process.env.FASTBOOT_REDIS_PORT;
const REDIS_EXPIRY = process.env.FASTBOOT_REDIS_EXPIRY;
const REDIS_URL    = process.env.FASTBOOT_REDIS_URL;

const S3_REGION = process.env.FASTBOOT_S3_REGION;
const S3_KEY = process.env.FASTBOOT_S3_KEY;
const S3_SECRET = process.env.FASTBOOT_S3_SECRET;

let s3;

if (S3_REGION || S3_KEY || S3_SECRET) {
  s3 = new AWS.S3({
    region: S3_REGION,
    accessKeyId: S3_KEY,
    secretAccessKey: S3_SECRET
  });
} else {
  console.log('No FASTBOOT_S3_REGION or FASTBOOT_S3_KEY or FASTBOOT_S3_SECRET provided; s3 credentials not provided.');
  s3 = null;
}

const downloader = new S3Downloader({
  bucket: process.env.FASTBOOT_S3_BUCKET,
  key: process.env.FASTBOOT_DEPLOY_INFO || "fastboot-deploy-info.json",
  s3: s3,
  currentPath: process.env.DEPLOY_CURRENT_PATH,
  baseArchivePath: process.env.BASE_ARCHIVE_PATH
});
const notifier = new S3Notifier({
  s3: s3,
  bucket: process.env.FASTBOOT_S3_BUCKET,
  key: process.env.FASTBOOT_DEPLOY_INFO
});

let cache;
if (REDIS_HOST || REDIS_PORT || REDIS_URL) {
  cache = new RedisCache({
    host: REDIS_HOST,
    port: REDIS_PORT,
    url: REDIS_URL,
    expiration: REDIS_EXPIRY
  });
} else {
  console.log('No FASTBOOT_REDIS_HOST or FASTBOOT_REDIS_PORT or FASTBOOT_REDIS_URL provided; caching is disabled.');
}

const server = new FastBootAppServer({
  downloader: downloader,
  notifier: notifier,
  cache: cache
});

server.start();
