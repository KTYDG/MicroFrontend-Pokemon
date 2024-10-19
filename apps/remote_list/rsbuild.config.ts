import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack';
import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { dependencies } from "./package.json";
import path from 'path';

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
    port: 3001,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
      'X-Content-Type-Options': 'text/javascript, text/css'
    }
  },
  dev: {
    assetPrefix: `http://localhost:3001`,
  },
  output: {
    distPath: process.env.GITHUB ? {
      root: '../dist/apps/remote_app_list'
    } : undefined,
    assetPrefix: 'http://localhost:3001',
    filenameHash: true,
  },
  tools: {
    rspack: (config, { appendPlugins }) => {
      config.resolve ||= {};
      config.resolve.alias ||= {};
      config.output ||= {};
      config.resolve.alias['@'] = path.resolve(__dirname, 'src');
      appendPlugins([
        new ModuleFederationPlugin({
          name: 'remote_app_list',
          filename: 'remoteEntry.js',
          exposes: {
            './Remote': './src/components/Remote.tsx',
            './store': './src/store/store.ts',
          },
          shared: makeShared(),
        }),
      ]);
    },
  },
});
