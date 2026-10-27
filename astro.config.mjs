import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';

const env = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), 'PUBLIC_');
const configuredSite = (process.env.PUBLIC_SITE_URL ?? env.PUBLIC_SITE_URL ?? '').trim();
if (configuredSite && !/^https:\/\/[a-z0-9.-]+(?::\d+)?\/?$/i.test(configuredSite)) {
  throw new Error('PUBLIC_SITE_URL must be a verified HTTPS origin, with no path.');
}

export default defineConfig({
  output: 'static',
  ...(configuredSite ? { site: configuredSite } : {}),
  trailingSlash: 'always',
  devToolbar: { enabled: false },
  server: { host: '127.0.0.1', port: 4322 },
  vite: { build: { cssCodeSplit: true } },
});
