import path from 'node:path';

import { pnpmWorkspaceRootSync as findWorkspaceDirSync } from '@node-kit/pnpm-workspace-root';
import findPackageDir from 'pkg-dir';

const WORKSPACE_DIR = findWorkspaceDirSync(process.cwd())!;
const PACKAGE_DIR = findPackageDir.sync()!;

export const DATABASE_PATH = path.resolve(PACKAGE_DIR, './dist/database.sqlite');

export const DATABASE_SEED_PATH = path.resolve(PACKAGE_DIR, './seeds/database.sqlite');

export const IMAGES_PATH = path.resolve(PACKAGE_DIR, './dist/images');

export const CLIENT_STATIC_PATH = path.resolve(WORKSPACE_DIR, './workspaces/client/dist');

export const INDEX_HTML = (isAdmin: boolean) => `<!doctype html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex, nofollow" />
    <link
      href="/assets/favicon.ico"
      rel="icon"
      type="image/x-icon"
    />
    <title>WSH 2024</title>
    <script type="text/javascript" src="/${isAdmin ? 'admin' : 'client'}.global.js" async></script>
    <style id="tag"></style>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
`;
