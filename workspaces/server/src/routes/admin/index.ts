import { Hono } from 'hono';

import { INDEX_HTML } from '../../constants/paths';

const app = new Hono();

app.get('/admin', async (c) => {
  return c.html(INDEX_HTML);
});

app.get('/admin/*', async (c) => {
  return c.html(INDEX_HTML);
});

export { app as adminApp };
