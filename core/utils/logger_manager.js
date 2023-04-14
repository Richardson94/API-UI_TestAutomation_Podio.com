const log4js = require('log4js');
const fileReader = require('./file_reader');
const configuration = fileReader.readJson('./configurationFile.json');
const logLevel = configuration['logLevel'] || 'info';

log4js.configure({
  appenders: {
    console: { type: 'console' },
    file: { type: 'file', filename: 'reports/log/exec.log', beckups: 3 },
  },
  categories: {
    default: { appenders: ['console', 'file'], level: logLevel.console },
    console: { appenders: ['console'], level: logLevel.console },
    file: { appenders: ['file'], level: logLevel.console },
  },
});

const logger = log4js.getLogger();
module.exports = logger;
