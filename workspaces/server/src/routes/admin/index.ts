import { Hono } from 'hono';

import { INDEX_HTML } from '../../constants/paths';

const app = new Hono();

app.get('/admin', async (c) => {
  return c.html(INDEX_HTML(true));
});

app.get('/admin/*', async (c) => {
  return c.html(INDEX_HTML(true));
});

export { app as adminApp };
