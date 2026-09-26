import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const server = require('../server.cjs');

export default async (req: any, res: any) => {
  const app = await server.appPromise;
  return app(req, res);
};
