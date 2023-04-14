const request_manager = require('../api/request_manager.js');

describe('Axios Request Manager Test Suite', () => {
  const BODY = {};
  const QUERY_PARAMS = {};
  const PORT = '';
  const URL = 'https://jsonplaceholder.typicode.com';

  test('GET method should return 200 if the request is sended correctly', async () => {
    const actualResult = await request_manager.send(
      'GET',
      '/users',
      BODY,
      QUERY_PARAMS,
      URL,
      PORT
    );
    const expectedResult = 200;
    expect(actualResult.status).toBe(expectedResult);
  });

  test('GET method should return 404 if the endpoint sended is not the correct', async () => {
    const actualResult = await request_manager.send(
      'GET',
      '/user',
      BODY,
      QUERY_PARAMS,
      URL,
      PORT
    );
    const expectedResult = 404;
    expect(actualResult.status).toBe(expectedResult);
  });

  test('POST method should return 201 if the request is sended correctly', async () => {
    const actualResult = await request_manager.send(
      'POST',
      '/posts',
      BODY,
      QUERY_PARAMS,
      URL,
      PORT
    );
    const expectedResult = 201;
    expect(actualResult.status).toBe(expectedResult);
  });

  test('POST method should return 404 if the endpoint sended is not the correct', async () => {
    const actualResult = await request_manager.send(
      'POST',
      '/user',
      BODY,
      QUERY_PARAMS,
      URL,
      PORT
    );
    const expectedResult = 404;
    expect(actualResult.status).toBe(expectedResult);
  });

  test('PUT method should return 200 if the request is sended correctly', async () => {
    const actualResult = await request_manager.send(
      'PUT',
      '/posts/1',
      BODY,
      QUERY_PARAMS,
      URL,
      PORT
    );
    const expectedResult = 200;
    expect(actualResult.status).toBe(expectedResult);
  });

  test('PUT method should return 404 if the enpoint sended is not the correct', async () => {
    const actualResult = await request_manager.send(
      'PUT',
      '/post',
      BODY,
      QUERY_PARAMS,
      URL,
      PORT
    );
    const expectedResult = 404;
    expect(actualResult.status).toBe(expectedResult);
  });

  test('PATCH method should return 200 if the request is sended correctly', async () => {
    const actualResult = await request_manager.send(
      'PATCH',
      '/posts/1',
      BODY,
      QUERY_PARAMS,
      URL,
      PORT
    );
    const expectedResult = 200;
    expect(actualResult.status).toBe(expectedResult);
  });

  test('PATCH method should return 404 if the enpoint sended is not the correct', async () => {
    const actualResult = await request_manager.send(
      'PATCH',
      '/post',
      BODY,
      QUERY_PARAMS,
      URL,
      PORT
    );
    const expectedResult = 404;
    expect(actualResult.status).toBe(expectedResult);
  });

  test('DELETE method should return 200 if the request is sended correctly', async () => {
    const actualResult = await request_manager.send(
      'DELETE',
      '/posts/1',
      BODY,
      QUERY_PARAMS,
      URL,
      PORT
    );
    const expectedResult = 200;
    expect(actualResult.status).toBe(expectedResult);
  });

  test('DELETE method should return 404 if the endpoint sended is not the correct', async () => {
    const actualResult = await request_manager.send(
      'DELETE',
      '/get',
      BODY,
      QUERY_PARAMS,
      URL,
      PORT
    );
    const expectedResult = 404;
    expect(actualResult.status).toBe(expectedResult);
  });
});
