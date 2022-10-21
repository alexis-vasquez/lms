import { matchRequestUrl, RequestHandler, MockedRequest } from 'msw';
import { setupServer as setupMsw, SetupServerApi } from 'msw/node';
import { cleanup, waitFor } from '@testing-library/react';

export type SetupServerOptions = {
  onPendingRequests?: 'error' | 'warn';
};

/**
 * A wrapper around the `setupServer` function of `msw/node`, which automatically
 * integrates in the test lifecycle.
 *
 * Example:
 * ```ts
 * describe('unit under test', () => {
 *   const server = setupServer();
 *
 *   test('works', () => {
 *     server.use(rest.get('/api/url', (req, res, ctx) => res(ctx.json({...}))));
 *
 *     // validate
 *   });
 * });
 * ```
 *
 * The wrapper establishes the following assumptions:
 * - The server will automatically start at the beginning of the suite and shutdown at the end
 * - It will remove all handlers, which were set in the test ensuring each test will declare all required API calls
 *
 * Note: The wrapper doesn't accept default handlers on purpose to ensure each test will fully specify its environment
 * instead of having to override defaults.
 *
 * @returns
 */
export function setupServer(
  { onPendingRequests = 'warn' }: SetupServerOptions = {},
  ...requestHandlers: RequestHandler[]
) {
  const server = setupMsw(...requestHandlers);
  const requests = new Map<string, MockedRequest>();

  server.events.on('request:start', (req) => {
    requests.set(req.id, req);
  });

  server.events.on('request:end', (req) => {
    requests.delete(req.id);
  });

  beforeAll(() => {
    server.listen({
      onUnhandledRequest: (req, { error }) => {
        // msw promises that request:end will be called at all times, but there is as of 0.39.2, where
        // unhandled requests will throw an error and completely disrupt the serving code omitting request:end
        // we workaround by using a custom unhandled request strategy and remove the request as pending
        // even if the bug is solved, attempting to delete the request again in request:end handler above should
        // simply be noop
        requests.delete(req.id);
        error();
      },
    });
  });

  beforeEach(() => {
    requests.clear();
  });

  afterEach(() => {
    if (requests.size > 0) {
      const pendingRequestsMessage = `Not all network requests were responded before the test ended. This usually means there is an issue in the test, which usually leads to flaky behavior.
      Pending requests:
      ${Array.from(requests.values())
    .map((req) => `${req.method} ${req.url.href}`)
    .join('\n')}`;
      switch (onPendingRequests) {
        case 'error':
          throw new Error(pendingRequestsMessage);
        case 'warn':
          console.error(pendingRequestsMessage);
      }
    }

    cleanup();
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  return server;
}

/**
 * Waits for a request with given method and URL to be made and returns it as a result.
 *
 * Note: The given URL can actually be an exact string, an Express-like path or a regex.
 * More information can be found on the [MSW website](https://mswjs.io/docs/basics/request-matching#request-url).
 *
 * Example usage:
 * ```ts
 * server.use(
 *   rest.put('/api/todos/todo-1', (req, res, ctx) => res(ctx.status(204))),
 * );
 *
 * // render and act
 * userEvent.click(...)
 *
 * // wait for the request to finish
 * const request = await waitForRequest(server, 'put', '/api/todos/:todoId');
 *
 * // assertions
 * expect(request.body).toEqual(...)
 * ```
 * Note that the returned promise will be resolved *after* the response is processed by the
 * application code, which means that consecutive `waitForRequest()` invocations will have
 * high chance of failing, because the application code has already started the next request.
 *
 * @param server A server created with `setupServer()`
 * @param method The HTTP method of the request in lower case
 * @param url The URL of the request.
 * @returns
 */
export function waitForRequest(
  server: SetupServerApi,
  method: 'get' | 'post' | 'put' | 'delete' | 'patch',
  url: string | RegExp
): Promise<MockedRequest> {
  let matchedReq: MockedRequest | undefined;
  let matched = false;

  return waitFor(
    () =>
      new Promise((resolve, _reject) => {
        server.events.on('request:match', (req) => {
          if (matched) {
            return;
          }

          if (
            req.method.toLowerCase() === method &&
            matchRequestUrl(req.url, url).matches
          ) {
            matchedReq = req;
            matched = true;
          }
        });

        server.events.on('response:mocked', (_res, reqId) => {
          if (matchedReq === undefined) {
            return;
          }
          if (matchedReq?.id === reqId) {
            resolve(matchedReq);
            // no need to hold the request anymore
            matchedReq = undefined;
          }
        });
      })
  );
}

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});