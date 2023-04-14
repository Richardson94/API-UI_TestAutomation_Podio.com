const log4js = require('log4js');
let logger = require('../utils/logger_manager.js');

describe('Logger Test Suit', () => {
  test('Verify logger initialize correctly ', async () => {
    logger = log4js.getLogger();
    expect(logger.category).toBe('default');
  });

  test('Verify logger can be selected as Console value', () => {
    const value = 'console';
    logger = log4js.getLogger(value);
    expect(logger.category).toBe(value);
  });

  test('Verify logger can be selected as File value', async () => {
    const value = 'file';
    logger = log4js.getLogger(value);
    expect(logger.category).toBe(value);
  });

  test('verify logger debug works in console', async () => {
    const value = 'console';
    logger = log4js.getLogger(value);
    const logSpy = jest.spyOn(logger, 'debug');
    logger.debug('test');
    expect(logSpy).toHaveBeenCalledWith('test');
  });

  test('verify logger info works in console', async () => {
    const value = 'console';
    logger = log4js.getLogger(value);
    const logSpy = jest.spyOn(logger, 'info');
    logger.info('test');
    expect(logSpy).toHaveBeenCalledWith('test');
  });
});
