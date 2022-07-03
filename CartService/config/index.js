const bunyan = require('bunyan');

const appname = 'APP';

module.exports = {
  applicationName: appname,
  logger: bunyan.createLogger({ name: appname }),
  redis: {
    options: {
      host: 'localhost',
      port: 6379
    }
  }
};
