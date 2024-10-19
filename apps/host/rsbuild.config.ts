import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack';
import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import path from 'path';
import { dependencies } from "./package.json";
const makeShared = () => {
  return Object.entries(dependencies).reduce((result, [dep, version]) => {
    return { ...result, [dep]: { singleton: true, requiredVersion: version } };
  }, {
    "mobx-react-lite": { singleton: true, requiredVersion: "4.0.7" }
  })
}

export default defineConfig({
  plugins: [pluginReact()],
  server: {
    port: 3000,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
      'X-Content-Type-Options': 'text/javascript, text/css'
    }
  },
  dev: {
    assetPrefix: `http://localhost:3000`,
  },
  output: {
    distPath: process.env.GITHUB ? {
      root: '../dist'
    } : undefined,
    assetPrefix: process.env.GITHUB ?? 'http://localhost:3000',
    filenameHash: true,
  },
  tools: {
    rspack: (config, { appendPlugins }) => {
      // Will work in dev only if set to "/"
      config.resolve ||= {};
      config.resolve.alias ||= {};
      config.output ||= {};
      // public
      config.resolve.alias['@'] = path.resolve(__dirname, 'src');
      appendPlugins([
        new ModuleFederationPlugin({
          name: 'rspack-host',
          remotes: {
            '@remote_1': process.env.GITHUB ?
              'remote_app_view@apps/remote_app_list/mf-manifest.json' :
              'remote_app_list@http://localhost:3001/mf-manifest.json',
            '@remote_2': process.env.GITHUB ?
              'remote_app_view@apps/remote_app_view/mf-manifest.json' :
              'remote_app_view@http://localhost:3002/mf-manifest.json',
          },
          // runtimePlugins: [path.resolve(__dirname, 'shared-strategy.ts')],
          shared: makeShared(),
        }),
      ]);
    },
  },
});
