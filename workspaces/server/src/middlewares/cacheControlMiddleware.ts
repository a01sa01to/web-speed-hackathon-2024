import { createMiddleware } from 'hono/factory';

export const cacheControlMiddleware = createMiddleware(async (c, next) => {
  await next();

  if (new URL(c.req.url).pathname.startsWith('/assets/')) {
    c.res.headers.append('Cache-Control', 'public');
    c.res.headers.append('Cache-Control', 'max-age=31536000');
    return;
  } else {
    c.res.headers.append('Cache-Control', 'private');
    c.res.headers.append('Cache-Control', 'no-store');
  }
});
