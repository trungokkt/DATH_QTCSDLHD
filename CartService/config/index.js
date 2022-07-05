const bunyan = require('bunyan');

const appname = 'APP';

module.exports = {
  applicationName: appname,
  logger: bunyan.createLogger({ name: appname }),
  redis: {
    options: {
      url: `redis://${process.env.REDIS_HOST || 'localhost'}:6379`
    }
  }
};
