# ember-fastboot-app-server

> A FastBoot app server based on [FastBoot AWS][1].

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/he9qi/ember-fastboot-app-server)

## environment variables

### `FASTBOOT_DEPLOY_INFO`

The deploy info used by `ember-fastboot-app-server` to fetch current build of ember-fastboot application. Defaults to `fastboot-deploy-info.json`

### `FASTBOOT_S3_BUCKET`

The S3 bucket name to that hosts ember-fastboot application and the deploy info.

### `FASTBOOT_REDIS_HOST`

The hostname of the Redis server where ember-fastboot applications are cached.

### `FASTBOOT_REDIS_PORT`

The port that Redis is listening on. Defaults to 6379. This only needs to be set if Redis is listening on a non-default port.

### `FASTBOOT_REDIS_EXPIRY`

The expire time for redis cache.

[1]: https://github.com/tomdale/fastboot-aws
